import { should } from "chai"; should()
import { Contestant } from "../src/classes/Contestant";
import { BracketService } from "../src/services/bracket-service.service";
import { Tournament } from "../src/classes/Tournament";
import { sendObject, miniContestant, miniSponsor, miniTournament, TournamentSubmissionFormatterService } from "../src/services/tournament-submission-formatter.service";
import { uuidv7 } from "uuidv7";

describe('Format Tournament Submission For Backend', function () {
  describe('4 Contestants', function () {
    it('FILL IN HERE', function () {
      let c1: Contestant = new Contestant("Al", 1);
      let c2: Contestant = new Contestant("Brittany", 2);
      let c3: Contestant = new Contestant("Chase", 3);
      let c4: Contestant = new Contestant("Danielle", 4);

      let cArr = [c1, c2, c3, c4];

      let startDate: Date = new Date();
      let endDate: Date = new Date(2025, 5, 4, 15, 30, 0);

      let tournament: Tournament = new Tournament("epic", "super fun", cArr, startDate, endDate);
      let bracketService: BracketService = new BracketService(tournament);
      //let formatterService: TournamentSubmissionFormatterService = new TournamentSubmissionFormatterService;
      //make forced UUIDs for testing purposes
      let forcedUUIDs: string[] = [];
      for (let i = 0; i < tournament.getContestants().length; i++) {
        forcedUUIDs.push(uuidv7());
      }
      let mockSendObject: sendObject = {
        tournament: {
          name: tournament.getName(),
          start_date: tournament.getStartDate(),
          end_date: tournament.getEndDate(),
          desc: tournament.getDescription(),
          prize: tournament.getPrize()
        },
        contestants: [
          {
            id: forcedUUIDs[0],
            name: tournament.getContestants()[0].getName(),
            seed: tournament.getContestants()[0].getSeed()
          },
          {
            id: forcedUUIDs[1],
            name: tournament.getContestants()[1].getName(),
            seed: tournament.getContestants()[1].getSeed()
          },
          {
            id: forcedUUIDs[2],
            name: tournament.getContestants()[2].getName(),
            seed: tournament.getContestants()[2].getSeed()
          },
          {
            id: forcedUUIDs[3],
            name: tournament.getContestants()[3].getName(),
            seed: tournament.getContestants()[3].getSeed()
          }
        ],
        matchups: [
          {
            c1: forcedUUIDs[0],
            c2: forcedUUIDs[1]
          },
          {
            c1: forcedUUIDs[2],
            c2: forcedUUIDs[3]
          }
        ],
        sponsor: undefined
      };
      console.log("format mock:\n", mockSendObject)
      bracketService.calculateMatchupCount().should.deep.equal(mockSendObject);
    })
  })
})
