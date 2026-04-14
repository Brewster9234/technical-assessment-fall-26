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

// cache setup
const CACHE_DURATION = 10 * 60 * 1000

// Ferrari driver numbers by season
const FERRARI_DRIVERS = {
  2026: [16, 44], // Leclerc + Hamilton
  2025: [16, 44], // Leclerc + Hamilton
  2024: [16, 55], // Leclerc + Sainz
  2023: [16, 55], // Leclerc + Sainz
}

let cachedPoints = null
let cacheTimePoints = null

app.get('/api/ferrari-points', async (req, res) => {
  try {
    const year = parseInt(req.query.year) || 2025
    const driverNums = FERRARI_DRIVERS[year] || [16, 44]

    if (cachedPoints && cacheTimePoints && cachedPoints._year === year && Date.now() - cacheTimePoints < CACHE_DURATION) {
      console.log('Returning cached points data')
      return res.status(200).json(cachedPoints.data)
    }

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
        await new Promise((resolve) => setTimeout(resolve, 600))

        const resultsRes = await fetch(
          `https://api.openf1.org/v1/session_result?session_key=${session.session_key}`
        )

        const contentType = resultsRes.headers.get('content-type')
        if (!contentType?.includes('application/json')) {
          console.log(`Skipping session ${session.session_key} — not JSON`)
          continue
        }

        const results = await resultsRes.json()
        if (!Array.isArray(results) || results.length === 0) {
          console.log(`No results for session ${session.session_key}`)
          continue
        }

        const driver1 = results.find(r => r.driver_number === driverNums[0])
        const driver2 = results.find(r => r.driver_number === driverNums[1])
        const totalPoints = (driver1?.points ?? 0) + (driver2?.points ?? 0)

        pointsData.push({
          location: session.circuit_short_name || session.location,
          session_key: session.session_key,
          points: totalPoints,
        })
      } catch (err) {
        console.log(`Skipping session ${session.session_key}:`, err.message)
      }
    }

    cachedPoints = { _year: year, data: pointsData }
    cacheTimePoints = Date.now()

    res.status(200).json(pointsData)
  } catch (error) {
    console.error('Error fetching Ferrari points:', error)
    res.status(500).json({ message: 'Error fetching points data' })
  }
})

let cachedRaceResults = null
let cacheTimeResults = null

app.get('/api/ferrari-race-results', async (req, res) => {
  try {
    const year = parseInt(req.query.year) || 2026
    const driverNums = FERRARI_DRIVERS[year] || [16, 44]

    if (cachedRaceResults && cacheTimeResults && cachedRaceResults._year === year && Date.now() - cacheTimeResults < CACHE_DURATION) {
      console.log('Returning cached race results')
      return res.status(200).json(cachedRaceResults.data)
    }

    await new Promise((resolve) => setTimeout(resolve, 500))

    const sessionsRes = await fetch(
      `https://api.openf1.org/v1/sessions?session_name=Race&year=${year}`
    )
    const sessions = await sessionsRes.json()

    if (!Array.isArray(sessions)) {
      console.error('Sessions response was not an array:', sessions)
      return res.status(500).json({ message: 'Rate limited — please wait a minute and try again' })
    }

    const raceResults = []

    for (const session of sessions) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 600))

        const resultsRes = await fetch(
          `https://api.openf1.org/v1/session_result?session_key=${session.session_key}`
        )

        const contentType = resultsRes.headers.get('content-type')
        if (!contentType?.includes('application/json')) {
          console.log(`Skipping session ${session.session_key} — not JSON`)
          continue
        }

        const results = await resultsRes.json()
        if (!Array.isArray(results) || results.length === 0) {
          console.log(`No results for session ${session.session_key}`)
          continue
        }

        const driver1 = results.find(r => r.driver_number === driverNums[0])
        const driver2 = results.find(r => r.driver_number === driverNums[1])

        raceResults.push({
          circuit: session.circuit_short_name || session.location,
          date: session.date_start,
          year: session.year,
          driver1_position: driver1?.position ?? '—',
          driver1_points: driver1?.points ?? 0,
          driver1_dnf: driver1?.dnf ?? false,
          driver2_position: driver2?.position ?? '—',
          driver2_points: driver2?.points ?? 0,
          driver2_dnf: driver2?.dnf ?? false,
          total_points: (driver1?.points ?? 0) + (driver2?.points ?? 0),
        })
      } catch (err) {
        console.log(`Skipping session ${session.session_key}:`, err.message)
      }
    }

    // sort most recent first
    raceResults.sort((a, b) => new Date(b.date) - new Date(a.date))

    cachedRaceResults = { _year: year, data: raceResults }
    cacheTimeResults = Date.now()

    res.status(200).json(raceResults)
  } catch (error) {
    console.error('Error fetching race results:', error)
    res.status(500).json({ message: 'Error fetching race results' })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})