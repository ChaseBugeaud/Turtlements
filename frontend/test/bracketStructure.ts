import { should } from "chai"; should()
import { Contestant } from "../src/classes/Contestant";
import { BracketService } from "../src/services/bracket-service.service";
import { Tournament } from "../src/classes/Tournament";
import { Matchup } from "../src/classes/Matchup";
var assert = require('assert');

describe('Bracket Skeleton Structure', function () {
  describe('Unsorted Order - 4 Contestants', function () {
    it('Should be: ' +
      '[m1, m2]:, ' +
      'm1(c1, c2) + m2(c3, c4) -> m3, ' +
      'm3 -> m4',
      function () {
        let c1: Contestant = new Contestant("Al", 1);
        let c2: Contestant = new Contestant("Brittany", 2);
        let c3: Contestant = new Contestant("Chase", 3);
        let c4: Contestant = new Contestant("Danielle", 4);

        let cArr: Contestant[] = [c1, c2, c3, c4];

        let m1: Matchup = new Matchup(1, 0, c1, c2);
        let m2: Matchup = new Matchup(1, 1, c3, c4);
        let m3: Matchup = new Matchup(1, 2);
        m1.setParent(m3);
        m2.setParent(m3);
        let m4: Matchup = new Matchup(1, 3);
        m3.setParent(m4);

        let correctBracket: Matchup[][] = [[m1, m2], [m3], [m4]];

        let datetime = new Date();

        let tournament: Tournament = new Tournament("Epic Tournament", "fun", cArr, datetime);
        let bracketService: BracketService = new BracketService(tournament);

        JSON.parse(JSON.stringify(bracketService.createSkeletonBracket())).should.deep.equal(JSON.parse(JSON.stringify(correctBracket)));
      })
  })

  describe('Unsorted Order - 5 Contestants', function () {
    it('Should be: ' +
      '[m1, m2, m3, m4]:, ' +
      'm1(c1) + m2(c2) -> m5(c1, c2), ' +
      'm3(c3) + m4(c4, c5) -> m6, ' +
      'm5() + m6() -> m7, ' +
      'm7() -> m8',
      function () {
        let c1: Contestant = new Contestant("Al", 1);
        let c2: Contestant = new Contestant("Brittany", 2);
        let c3: Contestant = new Contestant("Chase", 3);
        let c4: Contestant = new Contestant("Danielle", 4);
        let c5: Contestant = new Contestant("Eric", 5);

        let cArr: Contestant[] = [c1, c2, c3, c4, c5];

        let m1: Matchup = new Matchup(1, 0, c1);
        let m2: Matchup = new Matchup(1, 1, c2);
        let m3: Matchup = new Matchup(1, 2, c3);
        let m4: Matchup = new Matchup(1, 3, c4, c5);

        let m5: Matchup = new Matchup(1, 4, c1, c2);
        m1.setParent(m5);
        m2.setParent(m5);
        let m6: Matchup = new Matchup(1, 5);
        m6.setContestant1(c3)
        m3.setParent(m6);
        m4.setParent(m6);
        let m7: Matchup = new Matchup(1, 6);
        m5.setParent(m7);
        m6.setParent(m7);
        let m8: Matchup = new Matchup(1, 7);
        m7.setParent(m8);

        let correctBracket: Matchup[][] = [[m1, m2, m3, m4], [m5, m6], [m7], [m8]];

        let datetime = new Date();

        let tournament: Tournament = new Tournament("Epic Tournament", "fun", cArr, datetime);
        let bracketService: BracketService = new BracketService(tournament);

        JSON.parse(JSON.stringify(bracketService.createSkeletonBracket())).should.deep.equal(JSON.parse(JSON.stringify(correctBracket)));
      })
  })

  describe('1 Contestant', function () {
    it('throw error', function () {
      function insufficientContestants() {
        let c1: Contestant = new Contestant("Al", 1);
        let cArr = [c1];

        let datetime = new Date();

        let tournament: Tournament = new Tournament("Epic Tournament", "fun", cArr, datetime);

        let bracketService: BracketService = new BracketService(tournament);
        bracketService.createSkeletonBracket();
      }
      assert.throws(insufficientContestants, /InsufficientContestants/);
    })
  })
})
