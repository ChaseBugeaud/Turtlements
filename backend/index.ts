import dotenv from "dotenv"
import express from "express"
import pgPromise from "pg-promise"

dotenv.config()

const pg_user = process.env.PG_USER
const pg_pass = process.env.PG_PASS
const pg_host = process.env.PG_HOST
const pg_port = process.env.PG_PORT
const pg_database = process.env.PG_DATABASE

const app = express()
const port = 3000

const pgp = pgPromise()
const db = pgp(`postgres://${pg_user}:${pg_pass}@${pg_host}:${pg_port}/${pg_database}`)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

