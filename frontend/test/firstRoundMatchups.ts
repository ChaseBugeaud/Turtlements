import { should } from "chai"; should()
import { Contestant } from "../src/classes/Contestant";
import { BracketService } from "../src/services/bracket-service.service";
import { Tournament } from "../src/classes/Tournament";
import { Matchup } from "../src/classes/Matchup";
var assert = require('assert');

describe('Calculate First Round Matchups', function () {
  describe('4 Contestants', function () {
    it('[m1 (c1 c2), m2 (c3, c4)', function () {
      let c1: Contestant = new Contestant("Al", 1);
      let c2: Contestant = new Contestant("Brittany", 2);
      let c3: Contestant = new Contestant("Chase", 3);
      let c4: Contestant = new Contestant("Danielle", 4);

      let cArr = [c1, c2, c3, c4];

      let m1: Matchup = new Matchup(1, 0, c1, c2);
      let m2: Matchup = new Matchup(1, 1, c3, c4);
      let correctMatchups = [m1, m2];
      correctMatchups = JSON.parse(JSON.stringify(correctMatchups));

      let datetime = new Date();

      let tournament: Tournament = new Tournament("Epic Tournament", "fun", cArr, datetime);
      let bracketService: BracketService = new BracketService(tournament);
      JSON.parse(JSON.stringify(bracketService.createFirstRoundMatchups())).should.deep.equal(correctMatchups);
    })
  })

  describe('5 Contestants', function () {
    it('[m1(c1), m2(c2), m3(c3), m4(c4, c5)', function () {
      let c1: Contestant = new Contestant("Al", 1);
      let c2: Contestant = new Contestant("Brittany", 2);
      let c3: Contestant = new Contestant("Chase", 3);
      let c4: Contestant = new Contestant("Danielle", 4);
      let c5: Contestant = new Contestant("Ethan", 5);

      let cArr = [c1, c2, c3, c4, c5];

      let m1: Matchup = new Matchup(1, 0, c1);
      let m2: Matchup = new Matchup(1, 1, c2);
      let m3: Matchup = new Matchup(1, 2, c3);
      let m4: Matchup = new Matchup(1, 3, c4, c5)
      let correctMatchups = [m1, m2, m3, m4];

      correctMatchups = JSON.parse(JSON.stringify(correctMatchups));
      let datetime = new Date();
      let tournament: Tournament = new Tournament("Epic Tournament", "fun", cArr, datetime);
      let bracketService: BracketService = new BracketService(tournament);
      JSON.parse(JSON.stringify(bracketService.createFirstRoundMatchups())).should.deep.equal(correctMatchups);
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
        bracketService.createFirstRoundMatchups();
      }
      assert.throws(insufficientContestants, /InsufficientContestants/);

    })
  })
})
