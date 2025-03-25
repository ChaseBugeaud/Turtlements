
import { should } from "chai"; should()
import { TournamentComponent } from "../src/app/tournament/tournament.component";
describe('Tournament Object Creation Tests', function () {
  describe('update tournament object (title) with form details', function () {
    it('epic', function () {
      let t2: TournamentComponent = new TournamentComponent;
      t2.addDetailsToTournament("epic","awesome","cool",new Date(), new Date());
      t2.tournament.getName().test.should.equal("epic");
    })
  })
  describe('add contestant with empty name field', function () {
    it('null', function () {

      let t1: TournamentComponent = new TournamentComponent;
      t1.addContestantToTournament("");
      t1.tournament.getContestants().test.should.equal(null);
    })
  })
  describe('create tournament with required field (title) not filled out', function () {
    it('asdf', function () {
      let t2: TournamentComponent = new TournamentComponent;
      t2.addDetailsToTournament("","test desc","",new Date(), new Date());
      t2.tournament.getName().test.should.equal("asdf");
    })
  })
})
