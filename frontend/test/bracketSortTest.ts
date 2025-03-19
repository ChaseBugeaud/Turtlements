import { should } from "chai"; should()
import { Contestant } from "../src/classes/Contestant";
import { Tournament } from "../src/classes/Tournament";
import { BracketService } from "../src/services/bracket-service.service";
let assert = require('assert');

describe('Bracket sort test', function () {
  describe('5 contestants', function () {
    it('Should be c5, c2, c1, c3, c4', function () {

      let c1: Contestant = new Contestant("Al", 3);
      let c2: Contestant = new Contestant("Brittany", 2);
      let c3: Contestant = new Contestant("Chase", 4);
      let c4: Contestant = new Contestant("Danielle", 5);
      let c5: Contestant = new Contestant("Eric", 1);
      let cArr = [c1, c2, c3, c4, c5];

      let datetime = new Date();
      let tournament: Tournament = new Tournament("Epic Tournament", "fun", cArr, datetime);
      let bracketService: BracketService = new BracketService(tournament);

      bracketService.sortContestants();
      let sortedArr = [c5, c2, c1, c3, c4]
      tournament.getContestants().should.deep.equal(sortedArr);
    })
  })

  describe('0 contestants', function () {
    it('Throw InsufficientContestants Error', function () {
      function insufficientContestants() {
        let cArr: Contestant[] = [];
        let datetime = new Date();
        let tournament: Tournament = new Tournament("Epic Tournament", "fun", cArr, datetime);
        let bracketService: BracketService = new BracketService(tournament);
        bracketService.sortContestants();
      }
      assert.throws(insufficientContestants, /InsufficientContestants/);
    })
  })
})
