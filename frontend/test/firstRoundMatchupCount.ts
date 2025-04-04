import { should } from "chai"; should()
import { Contestant } from "../src/classes/Contestant";
import { BracketService } from "../src/services/bracket-service.service";
import { Tournament } from "../src/classes/Tournament";
var assert = require('assert');

describe('Calculate First Round Matchup Count', function () {
  describe('4 Contestants', function () {
    it('2 matchups', function () {
      let c1: Contestant = new Contestant("Al", 1);
      let c2: Contestant = new Contestant("Brittany", 2);
      let c3: Contestant = new Contestant("Chase", 3);
      let c4: Contestant = new Contestant("Danielle", 4);

      let cArr = [c1, c2, c3, c4];

      let datetime = new Date();

      let tournament: Tournament = new Tournament("Epic Tournament", "fun", cArr, datetime);
      let bracketService: BracketService = new BracketService(tournament);
      bracketService.calculateFirstRoundMatchupCount().should.equal(2);
    })
  })

  describe('5 Contestants', function () {
    it('4 Matchups', function () {
      let c1: Contestant = new Contestant("Al", 1);
      let c2: Contestant = new Contestant("Brittany", 2);
      let c3: Contestant = new Contestant("Chase", 3);
      let c4: Contestant = new Contestant("Danielle", 4);
      let c5: Contestant = new Contestant("Ethan", 5);

      let cArr = [c1, c2, c3, c4, c5];

      let datetime = new Date();

      let tournament: Tournament = new Tournament("Epic Tournament", "fun", cArr, datetime);
      let bracketService: BracketService = new BracketService(tournament);
      bracketService.calculateFirstRoundMatchupCount().should.equal(4);
    })
  })
  describe('1 Contestant', function () {
    it('Throw InsufficientContestants Error', function () {
      function insufficientContestants() {
        let c1: Contestant = new Contestant("Al", 1);

        let cArr = [c1];

        let datetime = new Date();

        let tournament: Tournament = new Tournament("Epic Tournament", "fun", cArr, datetime);
        let bracketService: BracketService = new BracketService(tournament);
        bracketService.calculateFirstRoundMatchupCount();
      }
      assert.throws(insufficientContestants, /InsufficientContestants/);

    })
  })
})
