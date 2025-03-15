import "reflect-metadata"
import express from "express"
import bodyParser from "body-parser"
import { DataSource } from "typeorm"
import { AppDataSource } from "./data-source.ts"
import { Tournament } from "./entity/Tournament.ts"
import { Contestant } from "./entity/Contestant.ts"
import { Matchup } from "./entity/Matchup.ts"
import { Score } from "./entity/Score.ts"
import { Sponsor } from "./entity/Sponsor.ts"

const app = express()
const port: number = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const appDataSource: DataSource = await initializeDataSource()
appDataSource.synchronize()

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.post("tournaments/create", (req, res) => {
  const tournamentBody: TournamentObj = req.body
  // const tournament = await makeTournament(tournamentBody)

  for (const contestantBody of tournamentBody.contestants) {
    // tournament.addContestant()
  }

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function makeTournament(tournamentBody: TournamentObj) {}

function makeContestant(contestantBody: ContestantObj) {}

type SponsorObj = {
  s_name: string,
  s_desc: string,
  s_thumb: string,
  s_head: string
}

type ContestantObj = {
  c_name: string,
  c_seed: number,
  c_logo: string
}

type TournamentObj = {
  t_title: string,
  t_desc: string,
  t_start: Date,
  t_end: Date,
  t_prize: string,

  sponsor?: SponsorObj,

  contestants: ContestantObj[]
}

async function initializeDataSource(): Promise<DataSource> {
  try {
    const ds = await AppDataSource.initialize()
    console.log("Data Source has been initialized!")
    return ds
  } catch (err) {
    console.error("Error during Data Source initilization", err)
    throw Error("DataSourceInitError")
  }
}
