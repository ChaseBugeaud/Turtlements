import { should } from "chai"; should()
import { Contestant } from "../src/classes/Contestant";
import { BracketService } from "../src/services/bracket-service.service";
import { Tournament } from "../src/classes/Tournament";
import { Matchup } from "../src/classes/Matchup";
var assert = require('assert');

describe('Bracket 2D Array Structure Test', function () {
  describe('Default Order - 4 Contestants', function () {
    it('Should be [ [m1, m2], [m3] ]', function () {
      let c1: Contestant = new Contestant("Al", 1);
      let c2: Contestant = new Contestant("Brittany", 2);
      let c3: Contestant = new Contestant("Chase", 3);
      let c4: Contestant = new Contestant("Danielle", 4);

      let cArr: Contestant[] = [c1, c2, c3, c4];

      let m1: Matchup = new Matchup(1, 0, c1, c2);
      let m2: Matchup = new Matchup(1, 1, c3, c4);
      let m3: Matchup = new Matchup(1, 2);

      let correctBracket: Matchup[][] = [
        [m1, m2],
        [m3],
      ];

      let datetime = new Date();

      let tournament: Tournament = new Tournament("Epic Tournament", "fun", cArr, datetime);
      let bracketService: BracketService = new BracketService(tournament);

      bracketService.createUnsortedBracket();
      JSON.parse(JSON.stringify(tournament.getBracket())).should.deep.equal(JSON.parse(JSON.stringify(correctBracket)));
    })
  })
  /*
    describe('Default Order - 5 Contestants', function () {
      it('Should be [ [m1], [m2, m3], [m4] ]', function () {
        let c1: Contestant = new Contestant("Al", 1);
        let c2: Contestant = new Contestant("Brittany", 2);
        let c3: Contestant = new Contestant("Chase", 3);
        let c4: Contestant = new Contestant("Danielle", 4);
        let c5: Contestant = new Contestant("Ethan", 5);

        let cArr: Contestant[] = [c1, c2, c3, c4, c5];

        let m1: Matchup = new Matchup(1, 0, c1, c2);
        let m2: Matchup = new Matchup(1, 1);
        let m3: Matchup = new Matchup(1, 2);
        let m4: Matchup = new Matchup(1, 3);
        let m5: Matchup = new Matchup(1, 4);
        let m6: Matchup = new Matchup(1, 5);
        let m7: Matchup = new Matchup(1, 6);

        let correctBracket: Matchup[][] = [
          [m1, m2, m3],
          [m4, m5],
          [m6],
          [m7]
        ];

        let datetime = new Date();

        let tournament: Tournament = new Tournament("Epic Tournament", "fun", cArr, datetime);
        let bracketService: BracketService = new BracketService(tournament);

        bracketService.createUnsortedBracket();
        JSON.parse(JSON.stringify(tournament.getBracket())).should.deep.equal(JSON.parse(JSON.stringify(correctBracket)));
      })
    })
    */

  describe('1 Contestant', function () {
    it('throw error', function () {
      function insufficientContestants() {
        let c1: Contestant = new Contestant("Al", 1);
        let cArr = [c1];

        let datetime = new Date();

        let tournament: Tournament = new Tournament("Epic Tournament", "fun", cArr, datetime);

        let bracketService: BracketService = new BracketService(tournament);
        bracketService.createUnsortedBracket();
      }
      assert.throws(insufficientContestants, /InsufficientContestants/);
    })
  })
})
