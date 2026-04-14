import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000

// health check
app.get('/', (req, res) => {
  res.send('Backend is running')
})

// fetches all Ferrari race sessions from OpenF1
app.get('/api/ferrari-results', async (req, res) => {
  try {
    const response = await fetch('https://api.openf1.org/v1/sessions?session_name=Race')
    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    console.error('Error fetching race data:', error)
    res.status(500).json({ message: 'Error fetching race data' })
  }
})

// fetches Ferrari's championship points after each race in a given year
// fetches one session at a time with a delay to avoid rate limiting from OpenF1
// simple memory cache so we don't ovelroad the OpenF1 API
let cachedPoints = null
let cacheTime = null
const CACHE_DURATION = 10 * 60 * 1000 // 10 minutes

app.get('/api/ferrari-points', async (req, res) => {
  try {
    // return cached data if it's less than 10 minutes old
    if (cachedPoints && cacheTime && Date.now() - cacheTime < CACHE_DURATION) {
      console.log('Returning cached points data')
      return res.status(200).json(cachedPoints)
    }

    const year = req.query.year || 2025

    await new Promise((resolve) => setTimeout(resolve, 500))

    const sessionsRes = await fetch(
      `https://api.openf1.org/v1/sessions?session_name=Race&year=${year}`
    )
    const sessions = await sessionsRes.json()

    if (!Array.isArray(sessions)) {
      console.error('Sessions response was not an array:', sessions)
      return res.status(500).json({ message: 'Rate limited — please wait a minute and try again' })
    }

    const pointsData = []

    for (const session of sessions) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 400))

        const champRes = await fetch(
          `https://api.openf1.org/v1/championship_teams?session_key=${session.session_key}&team_name=Ferrari`
        )

        const contentType = champRes.headers.get('content-type')
        if (!contentType || !contentType.includes('application/json')) {
          console.log(`Skipping session ${session.session_key} — not JSON`)
          continue
        }

        const champ = await champRes.json()

        if (!Array.isArray(champ) || champ.length === 0 || !champ[0].points_current) {
          console.log(`No Ferrari points data for session ${session.session_key}`)
          continue
        }

        pointsData.push({
          location: session.location,
          session_key: session.session_key,
          // points gained this race = current minus what they started with
          points: champ[0].points_current - champ[0].points_start,
        })
      } catch (err) {
        console.log(`Skipping session ${session.session_key}:`, err.message)
      }
    }

    // save to cache
    cachedPoints = pointsData
    cacheTime = Date.now()

    res.status(200).json(pointsData)
  } catch (error) {
    console.error('Error fetching Ferrari points:', error)
    res.status(500).json({ message: 'Error fetching points data' })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})