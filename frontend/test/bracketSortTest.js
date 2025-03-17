"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
(0, chai_1.should)();
var Contestant_1 = require("../src/classes/Contestant");
var Tournament_1 = require("../src/classes/Tournament");
var bracket_service_service_1 = require("../src/services/bracket-service.service");
var assert = require('assert');
describe('Bracket sort test', function () {
    describe('5 contestants', function () {
        it('Should be c5, c2, c1, c3, c4', function () {
            var c1 = new Contestant_1.Contestant("Al", 3);
            var c2 = new Contestant_1.Contestant("Brittany", 2);
            var c3 = new Contestant_1.Contestant("Chase", 4);
            var c4 = new Contestant_1.Contestant("Danielle", 5);
            var c5 = new Contestant_1.Contestant("Eric", 1);
            var cArr = [c1, c2, c3, c4, c5];
            var datetime = new Date();
            var tournament = new Tournament_1.Tournament("Epic Tournament", "fun", cArr, datetime);
            var bracketService = new bracket_service_service_1.BracketService(tournament);
            bracketService.sortContestants();
            var sortedArr = [c5, c2, c1, c3, c4];
            tournament.getContestants().should.deep.equal(sortedArr);
        });
    });
    describe('0 contestants', function () {
        it('Throw InsufficientContestants Error', function () {
            function insufficientContestants() {
                var cArr = [];
                var datetime = new Date();
                var tournament = new Tournament_1.Tournament("Epic Tournament", "fun", cArr, datetime);
                var bracketService = new bracket_service_service_1.BracketService(tournament);
                bracketService.sortContestants();
            }
            assert.throws(insufficientContestants, /InsufficientContestants/);
        });
    });
});
