const dotenv = require("dotenv")
dotenv.config()

const pg_database = process.env["PG_DATABASE"]
const pg_username = process.env["PG_USER"]
const pg_password = process.env["PG_PASS"]
const pg_host = process.env["PG_HOST"]

module.exports = {
  "development": {
    "username": pg_username,
    "password": pg_password,
    "database": pg_database,
    "host": pg_host,
    "dialect": "postgres",
    "dialectOptions": {
      // FIXME: this is a temp solution.
      // see https://stackoverflow.com/questions/61254851/heroku-postgres-sequelize-no-pg-hba-conf-entry-for-host
      ssl: {
        rejectUnauthorized: false
      }
    }
  },
  // "test": { //TODO: setup sqlite for testing
  //   "username": "root",
  //   "password": null,
  //   "database": "database_test",
  //   "host": "127.0.0.1",
  //   "dialect": "mysql"
  // },
  // "development": {
  //   "username": pg_username,
  //   "password": pg_password,
  //   "database": pg_database,
  //   "host": pg_host,
  //   "dialect": "postgres"
  // },
}
