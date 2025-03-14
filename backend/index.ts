import dotenv from "dotenv"
import express from "express"
import bodyParser from "body-parser"
import { Sequelize } from "sequelize"
// import { PostgresDialect } from "sequelize"

dotenv.config()

const app = express()
const port: number = 3000
const pg_database: string = process.env["PG_DATABASE"]!
const pg_username: string = process.env["PG_USER"]!
const pg_password: string = process.env["PG_PASS"]!
const pg_host: string = process.env["PG_HOST"]!

const sequelize = new Sequelize(pg_database, pg_username, pg_password, {
  host: pg_host,
  dialect: "postgres",
  dialectOptions: {
    // FIXME: this is a temp solution.
    // see https://stackoverflow.com/questions/61254851/heroku-postgres-sequelize-no-pg-hba-conf-entry-for-host
    ssl: {
      rejectUnauthorized: false
    }
  }
})

try {
  await sequelize.authenticate()
  console.log("connection established")
} catch (e) {
  console.error(e)
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

