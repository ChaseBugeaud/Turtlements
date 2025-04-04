"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
(0, chai_1.should)();
var Contestant_1 = require("../src/classes/Contestant");
var bracket_service_service_1 = require("../src/services/bracket-service.service");
var Tournament_1 = require("../src/classes/Tournament");
var uuidv7_1 = require("uuidv7");
describe('Format Tournament Submission For Backend', function () {
    describe('4 Contestants', function () {
        it('FILL IN HERE', function () {
            var c1 = new Contestant_1.Contestant("Al", 1);
            var c2 = new Contestant_1.Contestant("Brittany", 2);
            var c3 = new Contestant_1.Contestant("Chase", 3);
            var c4 = new Contestant_1.Contestant("Danielle", 4);
            var cArr = [c1, c2, c3, c4];
            var datetime = new Date();
            var tournament = new Tournament_1.Tournament("epic", "super fun", cArr, datetime);
            var bracketService = new bracket_service_service_1.BracketService(tournament);
            //let formatterService: TournamentSubmissionFormatterService = new TournamentSubmissionFormatterService;
            //make forced UUIDs for testing purposes
            var forcedUUIDs = [];
            for (var i = 0; i < tournament.getContestants().length; i++) {
                forcedUUIDs.push((0, uuidv7_1.uuidv7)());
            }
            var mockSendObject = {
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
            console.log("format mock:\n", mockSendObject);
            bracketService.calculateMatchupCount().should.deep.equal(mockSendObject);
        });
    });
});
