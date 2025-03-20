"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
(0, chai_1.should)();
var Contestant_1 = require("../src/classes/Contestant");
var bracket_service_service_1 = require("../src/services/bracket-service.service");
var Tournament_1 = require("../src/classes/Tournament");
var assert = require('assert');
describe('Calculate First Round Matchup Count', function () {
    describe('4 Contestants', function () {
        it('2 matchups', function () {
            var c1 = new Contestant_1.Contestant("Al", 1);
            var c2 = new Contestant_1.Contestant("Brittany", 2);
            var c3 = new Contestant_1.Contestant("Chase", 3);
            var c4 = new Contestant_1.Contestant("Danielle", 4);
            var cArr = [c1, c2, c3, c4];
            var datetime = new Date();
            var tournament = new Tournament_1.Tournament("Epic Tournament", "fun", cArr, datetime);
            var bracketService = new bracket_service_service_1.BracketService(tournament);
            bracketService.calculateFirstRoundMatchupCount().should.equal(2);
        });
    });
    describe('5 Contestants', function () {
        it('4 Matchups', function () {
            var c1 = new Contestant_1.Contestant("Al", 1);
            var c2 = new Contestant_1.Contestant("Brittany", 2);
            var c3 = new Contestant_1.Contestant("Chase", 3);
            var c4 = new Contestant_1.Contestant("Danielle", 4);
            var c5 = new Contestant_1.Contestant("Ethan", 5);
            var cArr = [c1, c2, c3, c4, c5];
            var datetime = new Date();
            var tournament = new Tournament_1.Tournament("Epic Tournament", "fun", cArr, datetime);
            var bracketService = new bracket_service_service_1.BracketService(tournament);
            bracketService.calculateFirstRoundMatchupCount().should.equal(4);
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
                bracketService.calculateFirstRoundMatchupCount();
            }
            assert.throws(insufficientContestants, /InsufficientContestants/);
        });
    });
});
