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
  2026: [16, 44], // Leclerc-Hamilton
  2025: [16, 44], // Leclerc-Hamilton
  2024: [16, 55], // Leclerc-Sainz
  2023: [16, 55], // Leclerc-Sainz
}

//CHART: Ferrari points per race 
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

// RESULTS TABLE: All Ferrari constructor results via Jolpica
// https://api.jolpi.ca/ergast/f1/constructors/ferrari/results.json

let cachedConstructorResults = null
let cacheTimeConstructorResults = null

app.get('/api/ferrari-constructor-results', async (req, res) => {
  try {
    if (cachedConstructorResults && cacheTimeConstructorResults && Date.now() - cacheTimeConstructorResults < CACHE_DURATION) {
      console.log('Returning cached constructor results')
      return res.status(200).json(cachedConstructorResults)
    }

    // paginates at 100 results per request
    // fetch multiple pages and combine them
    const allResults = []
    const limit = 100
    let offset = 0
    let totalResults = null

    console.log('Fetching Ferrari constructor results from Jolpica...')

    // keep fetching pages
    while (true) {
      const res2 = await fetch(
        `https://api.jolpi.ca/ergast/f1/constructors/ferrari/results.json?limit=${limit}&offset=${offset}`
      )
      const data = await res2.json()

      const table = data?.MRData?.RaceTable?.Races
      if (!Array.isArray(table)) break

      // on first request grab the total 
      if (totalResults === null) {
        totalResults = parseInt(data?.MRData?.total ?? 0)
        console.log(`Total Ferrari results available: ${totalResults}`)
      }

      // each Race object contains Results array with one entry per driver
      for (const race of table) {
        for (const result of race.Results) {
          allResults.push({
            season: race.season,
            round: parseInt(race.round),
            race: race.raceName,
            circuit: race.Circuit?.circuitName,
            date: race.date,
            driver: `${result.Driver?.givenName} ${result.Driver?.familyName}`,
            grid: result.grid,
            position: result.position,
            points: parseFloat(result.points),
            status: result.status,
          })
        }
      }

      offset += limit

      // stop if fetched everything
      if (offset >= totalResults) break

      // small delay between pages
      await new Promise((resolve) => setTimeout(resolve, 300))
    }

    // sort most recent first
    allResults.sort((a, b) => {
      if (b.season !== a.season) return parseInt(b.season) - parseInt(a.season)
      return b.round - a.round
    })

    console.log(`Done — fetched ${allResults.length} Ferrari results`)

    cachedConstructorResults = allResults
    cacheTimeConstructorResults = Date.now()

    res.status(200).json(allResults)
  } catch (error) {
    console.error('Error fetching constructor results:', error)
    res.status(500).json({ message: 'Error fetching constructor results' })
  }
})

// 2026 RACE RESULTS (for the stats section)
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