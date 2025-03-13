import { should } from "chai"; should()
import { Matchup } from "../src/classes/Matchup";
import { Contestant } from "../src/classes/Contestant";
import { BracketService } from "../src/services/bracket-service.service";
import { Tournament } from "../src/classes/Tournament";

describe('Creates tournament array', function () {
  describe('Add to tournament, checks order', function () {
    it('', function () {

      let c1: Contestant = new Contestant("Al", 5);
      let c2: Contestant = new Contestant("Brittany", 4);
      let c3: Contestant = new Contestant("Chase", 3);
      let c4: Contestant = new Contestant("Danielle", 2);
      let c5: Contestant = new Contestant("Eric", 1);

      let cArr = [c1, c2, c3, c4, c5];

      let datetime = new Date();

      let tournament: Tournament = new Tournament("Epic Tournament", "fun", cArr, datetime);
      let bracketService: BracketService = new BracketService(tournament);
      tournament.getMatchups().should.equal([c5, c4, c3, c2, c1]);

    })
  })
})
