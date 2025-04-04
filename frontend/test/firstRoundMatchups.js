"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
(0, chai_1.should)();
var Contestant_1 = require("../src/classes/Contestant");
var bracket_service_service_1 = require("../src/services/bracket-service.service");
var Tournament_1 = require("../src/classes/Tournament");
var Matchup_1 = require("../src/classes/Matchup");
var assert = require('assert');
describe('Calculate First Round Matchups', function () {
    describe('4 Contestants', function () {
        it('[m1 (c1 c2), m2 (c3, c4)', function () {
            var c1 = new Contestant_1.Contestant("Al", 1);
            var c2 = new Contestant_1.Contestant("Brittany", 2);
            var c3 = new Contestant_1.Contestant("Chase", 3);
            var c4 = new Contestant_1.Contestant("Danielle", 4);
            var cArr = [c1, c2, c3, c4];
            var m1 = new Matchup_1.Matchup(1, 0, c1, c2);
            var m2 = new Matchup_1.Matchup(1, 1, c3, c4);
            var correctMatchups = [m1, m2];
            correctMatchups = JSON.parse(JSON.stringify(correctMatchups));
            var datetime = new Date();
            var tournament = new Tournament_1.Tournament("Epic Tournament", "fun", cArr, datetime);
            var bracketService = new bracket_service_service_1.BracketService(tournament);
            JSON.parse(JSON.stringify(bracketService.createFirstRoundMatchups())).should.deep.equal(correctMatchups);
        });
    });
    describe('5 Contestants', function () {
        it('[m1(c1), m2(c2), m3(c3), m4(c4, c5)', function () {
            var c1 = new Contestant_1.Contestant("Al", 1);
            var c2 = new Contestant_1.Contestant("Brittany", 2);
            var c3 = new Contestant_1.Contestant("Chase", 3);
            var c4 = new Contestant_1.Contestant("Danielle", 4);
            var c5 = new Contestant_1.Contestant("Ethan", 5);
            var cArr = [c1, c2, c3, c4, c5];
            var m1 = new Matchup_1.Matchup(1, 0, c1);
            var m2 = new Matchup_1.Matchup(1, 1, c2);
            var m3 = new Matchup_1.Matchup(1, 2, c3);
            var m4 = new Matchup_1.Matchup(1, 3, c4, c5);
            var correctMatchups = [m1, m2, m3, m4];
            correctMatchups = JSON.parse(JSON.stringify(correctMatchups));
            var datetime = new Date();
            var tournament = new Tournament_1.Tournament("Epic Tournament", "fun", cArr, datetime);
            var bracketService = new bracket_service_service_1.BracketService(tournament);
            JSON.parse(JSON.stringify(bracketService.createFirstRoundMatchups())).should.deep.equal(correctMatchups);
        });
    });
    describe('1 Contestant', function () {
        it('Throw InsufficientContestants Error', function () {
            function insufficientContestants() {
                var c1 = new Contestant_1.Contestant("Al", 1);
                var cArr = [c1];
                var datetime = new Date();
                var tournament = new Tournament_1.Tournament("Epic Tournament", "fun", cArr, datetime);
                var bracketService = new bracket_service_service_1.BracketService(tournament);
                bracketService.createFirstRoundMatchups();
            }
            assert.throws(insufficientContestants, /InsufficientContestants/);
        });
    });
});
