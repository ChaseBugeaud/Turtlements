import { should } from "chai"; should()
import { Contestant } from "../src/classes/Contestant";
import { BracketService } from "../src/services/bracket-service.service";
import { Tournament } from "../src/classes/Tournament";

describe('Calculate Matchup Count', function () {
  describe('4 Contestants', function () {
    it('3 matchups', function () {
      let c1: Contestant = new Contestant("Al", 1);
      let c2: Contestant = new Contestant("Brittany", 2);
      let c3: Contestant = new Contestant("Chase", 3);
      let c4: Contestant = new Contestant("Danielle", 4);

      let cArr = [c1, c2, c3, c4];

      let datetime = new Date();


      let tournament: Tournament = new Tournament("Epic Tournament", "fun", cArr, datetime);
      let bracketService: BracketService = new BracketService(tournament);
      bracketService.calculateMatchupCount().should.equal(3);
    })
  })

  describe('9 Contestants', function () {
    it('15 matchups', function () {
      let c1: Contestant = new Contestant("Al", 1);
      let c2: Contestant = new Contestant("Brittany", 2);
      let c3: Contestant = new Contestant("Chase", 3);
      let c4: Contestant = new Contestant("Danielle", 4);
      let c5: Contestant = new Contestant("Eric", 5);
      let c6: Contestant = new Contestant("Fran", 6);
      let c7: Contestant = new Contestant("Gary", 7);
      let c8: Contestant = new Contestant("Hilary", 8);
      let c9: Contestant = new Contestant("Ivan", 9);
      let cArr = [c1, c2, c3, c4, c5, c6, c7, c8, c9];

      let datetime = new Date();

      let tournament: Tournament = new Tournament("Epic Tournament", "fun", cArr, datetime);

      let bracketService: BracketService = new BracketService(tournament);
      bracketService.calculateMatchupCount().should.equal(15);

    })
  })

})
