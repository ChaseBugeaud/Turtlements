"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
(0, chai_1.should)();
var Contestant_1 = require("../src/classes/Contestant");
var bracket_service_service_1 = require("../src/services/bracket-service.service");
var Tournament_1 = require("../src/classes/Tournament");
var assert = require('assert');
describe('Calculate Matchup Count', function () {
    describe('4 Contestants', function () {
        it('3 matchups', function () {
            var c1 = new Contestant_1.Contestant("Al", 1);
            var c2 = new Contestant_1.Contestant("Brittany", 2);
            var c3 = new Contestant_1.Contestant("Chase", 3);
            var c4 = new Contestant_1.Contestant("Danielle", 4);
            var cArr = [c1, c2, c3, c4];
            var datetime = new Date();
            var tournament = new Tournament_1.Tournament("Epic Tournament", "fun", cArr, datetime);
            var bracketService = new bracket_service_service_1.BracketService(tournament);
            bracketService.calculateMatchupCount().should.equal(3);
        });
    });
    describe('9 Contestants', function () {
        it('15 matchups', function () {
            var c1 = new Contestant_1.Contestant("Al", 1);
            var c2 = new Contestant_1.Contestant("Brittany", 2);
            var c3 = new Contestant_1.Contestant("Chase", 3);
            var c4 = new Contestant_1.Contestant("Danielle", 4);
            var c5 = new Contestant_1.Contestant("Eric", 5);
            var c6 = new Contestant_1.Contestant("Fran", 6);
            var c7 = new Contestant_1.Contestant("Gary", 7);
            var c8 = new Contestant_1.Contestant("Hilary", 8);
            var c9 = new Contestant_1.Contestant("Ivan", 9);
            var cArr = [c1, c2, c3, c4, c5, c6, c7, c8, c9];
            var datetime = new Date();
            var tournament = new Tournament_1.Tournament("Epic Tournament", "fun", cArr, datetime);
            var bracketService = new bracket_service_service_1.BracketService(tournament);
            bracketService.calculateMatchupCount().should.equal(15);
        });
    });
    describe('1 Contestant', function () {
        it('throw error', function () {
            function insufficientContestants() {
                var c1 = new Contestant_1.Contestant("Al", 1);
                var cArr = [c1];
                var datetime = new Date();
                var tournament = new Tournament_1.Tournament("Epic Tournament", "fun", cArr, datetime);
                var bracketService = new bracket_service_service_1.BracketService(tournament);
                bracketService.calculateMatchupCount();
            }
            assert.throws(insufficientContestants, /InsufficientContestants/);
        });
    });
});
