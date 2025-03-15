import { should } from "chai"; should()
import express from "express"
import sinon from "sinon"
// TODO: figure out how to import Faker

let req;

before("spin up the server", function () {
  const app = express()
})

describe("Tournament", function () {
  describe("create", function () {
    beforeEach("initialize request body", function () {
      req = {
        "t_title": "My Tournament",
        "t_desc": "Here's a description",
        "t_start": Date.parse("March 30 2025"),
        "t_end": Date.parse("April 15 2025"),
        "t_prize": "Five dollars",

        "contestants": []
      }
    })

    afterEach("reset sinon state", function () {
      sinon.restore()
    })

    context("creating a tournament with start date in the past", function () {
      it("sends the insert query", function () {
      })
    })

    context("creating a tournament with start date after end date", function () {
      it("throws an error", function () {
      })
    })

    context("creating a tournament with 0 contestants", function () {
      it("sends the insert query", function () {
        const pg = sinon.mock({ none: function (query) { return query } })
        pg.expects("none").withExactArgs(
          "INSERT INTO tournament(name, description, start_date, end_date, prize)" +
          " VALUES(${req.t_title}, ${req.t_desc}, ${req.t_start}, ${req.t_end}, ${req.t_prize})", req
        )
        createTournamentQuery(req)
      })
    })

    context("creating a tournament with 1 contestant", function () {
      it("sends the insert query", function () {
        req.contestants = [
          {
            "c_name": "",
            "c_seed": "...",
            "c_logo": "..."
          }
        ]
      })
    })

    context("creating a tournament with 2 contestants", function () {
      it("sends the insert query", function () {
      })
    })

    context("creating a tournament with 21 contestants", function () {
      it("sends the insert query", function () {
      })
    })
  })
})
