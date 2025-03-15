import express from "express"
import bodyParser from "body-parser"

const app = express()
const port: number = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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
