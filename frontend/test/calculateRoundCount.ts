
import { should } from "chai"; should()
import { Contestant } from "../src/classes/Contestant";
import { Tournament } from "../src/classes/Tournament";
import { BracketService } from "../src/services/bracket-service.service";
var assert = require('assert');

describe('Calculate Round Count', function () {
  describe('4 Contestants', function () {
    it('3 Rounds', function () {
      let c1: Contestant = new Contestant("Al", 1);
      let c2: Contestant = new Contestant("Brittany", 2);
      let c3: Contestant = new Contestant("Chase", 3);
      let c4: Contestant = new Contestant("Danielle", 4);

      let cArr = [c1, c2, c3, c4];

      let datetime = new Date();

      let tournament: Tournament = new Tournament("Epic Tournament", "fun", cArr, datetime);
      let bracketService: BracketService = new BracketService(tournament);
      bracketService.calculateRoundCount().should.equal(3);
    })

    describe('5 Contestants', function () {
      it('4 rounds', function () {
        let c1: Contestant = new Contestant("Al", 1);
        let c2: Contestant = new Contestant("Brittany", 2);
        let c3: Contestant = new Contestant("Chase", 3);
        let c4: Contestant = new Contestant("Danielle", 4);
        let c5: Contestant = new Contestant("Eric", 5);

        let cArr = [c1, c2, c3, c4, c5];

        let datetime = new Date();

        let tournament: Tournament = new Tournament("Epic Tournament", "fun", cArr, datetime);
        let bracketService: BracketService = new BracketService(tournament);
        bracketService.calculateRoundCount().should.equal(4);
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
          bracketService.calculateRoundCount();
        }
        assert.throws(insufficientContestants, /InsufficientContestants/);
      })
    })

  })
})
