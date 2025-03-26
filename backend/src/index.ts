import dotenv from "dotenv"
import express from "express"
import { drizzle } from "drizzle-orm/node-postgres"
import { seed } from "drizzle-seed"
import { tournaments, contestants, sponsors, scores, matchups } from "./db/schema.ts"
import * as schema from "./db/schema.ts"
import cors from "cors"

dotenv.config()

const pg_user = process.env.PG_USER
const pg_pass = process.env.PG_PASS
const pg_host = process.env.PG_HOST
const pg_port = process.env.PG_PORT
const pg_database = process.env.PG_DATABASE

const app = express()
const port = 3000

const db = drizzle({
  connection: {
    connectionString: `postgresql://${pg_user}:${pg_pass}@${pg_host}/${pg_database}?ssl{"rejectUnauthorized":false}`,
    ssl: {
      rejectUnauthorized: false
    }
  }
})

app.use(cors({ origin:true }))
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.post("/test", (req, res) => {
  res.send("yo wassup")
})

app.post("/tournaments/create", async (req, res) => {
  try {
    await db.transaction(async (tx) => {
      console.log(req.body)
      const tournamentId: number | null = await tx.insert(tournaments).values({
        name: req.body.name,
        description: req.body.description,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        prize: req.body.prize
      })
        .returning({ tournament_id: tournaments.id })
        .then(res => res[0].tournament_id ?? null)

      console.log(tournamentId)

      for (const contestant of req.body.contestants) {
        await tx.insert(contestants).values({
          name: contestant.name,
          logo: contestant.logo,
          seed: Number(contestant.seed),
          tournament_id: Number(tournamentId)
        })
      }

      if (req.body.sponsor) {
        const sponsor: SponsorObj = req.body.sponsor
        await tx.insert(sponsors).values({
          name: sponsor.name,
          description: sponsor.description,
          thumbnail: sponsor.thumbnail,
          header_image: sponsor.header_image,
          tournament_id: Number(tournamentId)
        })
      }
    })
    res.send("Success!")
  } catch (err) {
    res.send("Error! Try again. Log: " + err)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

type SponsorObj = {
  name: string,
  description: string,
  thumbnail: string,
  header_image: string
}

type ContestantObj = {
  name: string,
  seed: number,
  logo: string
}

type TournamentObj = {
  name: string,
  description: string,
  start_date: Date,
  end_date: Date,
  prize?: string,

  sponsor?: SponsorObj,

  contestants: ContestantObj[]
}
