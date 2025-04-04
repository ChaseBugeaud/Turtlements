import dotenv from "dotenv"
import express from "express"
import { drizzle } from "drizzle-orm/node-postgres"
import { eq } from "drizzle-orm"
import { seed } from "drizzle-seed"
import { tournaments, contestants, sponsors, scores, matchups, admins } from "./db/schema.ts"
import * as schema from "./db/schema.ts"
import { and, eq, sql } from "drizzle-orm"
import cors from "cors"
import { createHash } from "crypto"

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
app.use(cors())

app.get("/", (req, res) => {
  res.send("Hello World!")
})

// POST test to make sure credentials are sent and return correct value
app.post("/login", async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  console.log("crypt: " + createHash("sha256").update(password).digest("hex"))

  try {
    const creds = await db.select().from(admins)
      .where(and(eq(admins.username, username), eq(admins.password, "\\x" + createHash("sha256").update(password).digest("hex"))))
      .then(res => res[0].username ?? null)
    console.log(creds)
    if (creds) res.status(200).json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(401).json({ success: false })

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
    res.send(tournament)
  } catch (err) {
    res.send("Something went wrong! Error: " + err)
  }
})

app.post("/tournaments/create", async (req, res) => {
  try {
    await db.transaction(async (tx) => {
      const tournamentId: number | null = await tx.insert(tournaments).values({
        name: req.body.tournament.name,
        description: req.body.tournament.description,
        start_date: req.body.tournament.start_date,
        end_date: req.body.tournament.end_date,
        prize: req.body.tournament.prize
      })
        .returning({ tournament_id: tournaments.id })
        .then(res => res[0].tournament_id ?? null)

      for (const contestant of req.body.contestants) {
        await tx.insert(contestants).values({
          id: contestant.id,
          name: contestant.name,
          logo: contestant.logo,
          seed: Number(contestant.seed),
          tournament_id: Number(tournamentId)
        })
      }

      for (const matchup of req.body.matchups) {
        await tx.insert(matchups).values({
          tournament_id: Number(tournamentId),
          contestant1_id: matchup.contestant1,
          contestant2_id: matchup.contestant2,
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
