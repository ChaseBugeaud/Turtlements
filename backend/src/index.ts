import dotenv from "dotenv"
import express from "express"
import { drizzle } from "drizzle-orm/node-postgres"
import { eq } from "drizzle-orm"
import { seed } from "drizzle-seed"
import { tournaments, contestants, sponsors, scores, matchups } from "./db/schema.ts"
import * as schema from "./db/schema.ts"

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
  },
  schema: schema
})

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.get("/tournaments/:tournamentId", async (req, res) => {
  const tournamentId = Number(req.params.tournamentId)
  try {
    const tournament = await db.query.tournaments.findFirst({
      where: eq(tournaments.id, tournamentId),
      with: {
        contestants: true,
        sponsor: true
      }
    })
    console.log(tournament)
    // const tournament = db.select().from(tournaments).where(eq(tournaments.id, tournamentId))[0]
    // const contestantArr = db.select().from(contestants).where(eq(contestants.tournament_id, tournamentId))
    // const sponsor = db.select().from(sponsors).where(eq(sponsors.tournament_id, tournamentId))[0]
    const responseObj = {
      "name": tournament!.name,
      "description": tournament!.description,
      "start_date": tournament!.start_date,
      "end_date": tournament!.end_date,
      "prize": tournament?.prize
      // "sponsor": {
      //   "name": "guy",
      //   "description": "yooo",
      //   "thumbnail": "url",
      //   "header_image": "myUrl"
      // },
      // "contestants": [
      //   {
      //     "name": "chase",
      //     "logo": "logoUrl",
      //     "seed": "3"
      //   },
      //   {
      //     "name": "preet",
      //     "logo": "logoUrl",
      //     "seed": "2"
      //   }
      // ]
    }
    console.log(responseObj)
    res.send(responseObj)
  } catch (err) {
    res.send("Something went wrong! Error: " + err)
  }
})

app.post("/tournaments/create", async (req, res) => {
  try {
    await db.transaction(async (tx) => {
      const tournamentId: number | null = await tx.insert(tournaments).values({
        name: req.body.name,
        description: req.body.description,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        prize: req.body.prize
      })
        .returning({ tournament_id: tournaments.id })
        .then(res => res[0].tournament_id ?? null)

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
      res.redirect(`/tournaments/${tournamentId}`)
    })
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
