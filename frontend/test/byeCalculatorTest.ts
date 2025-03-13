import { should } from "chai"; should()
import { Contestant } from "../src/classes/Contestant";
import { Tournament } from "../src/classes/Tournament";
import { BracketService } from "../src/services/bracket-service.service";

describe('Calculate Bye Count', function () {
  describe('4 Contestants', function () {
    it('0 byes', function () {
      let c1: Contestant = new Contestant("Al", 1);
      let c2: Contestant = new Contestant("Brittany", 2);
      let c3: Contestant = new Contestant("Chase", 3);
      let c4: Contestant = new Contestant("Danielle", 4);

      let cArr = [c1, c2, c3, c4];

      let datetime = new Date();

      let tournament: Tournament = new Tournament("Epic Tournament", "fun", cArr, datetime);
      let bracketService: BracketService = new BracketService(tournament);
      bracketService.calculateByes().should.equal(0);
    })
    describe('5 Contestants', function () {
      it('3 byes', function () {
        let c1: Contestant = new Contestant("Al", 1);
        let c2: Contestant = new Contestant("Brittany", 2);
        let c3: Contestant = new Contestant("Chase", 3);
        let c4: Contestant = new Contestant("Danielle", 4);
        let c5: Contestant = new Contestant("Eric", 5);

        let cArr = [c1, c2, c3, c4, c5];

        let datetime = new Date();

        let tournament: Tournament = new Tournament("Epic Tournament", "fun", cArr, datetime);
        let bracketService: BracketService = new BracketService(tournament);
        bracketService.calculateByes().should.equal(3);
      })
    })
  })
})
