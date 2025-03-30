"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
(0, chai_1.should)();
var Contestant_1 = require("../src/classes/Contestant");
var bracket_service_service_1 = require("../src/services/bracket-service.service");
var Tournament_1 = require("../src/classes/Tournament");
var Matchup_1 = require("../src/classes/Matchup");
var assert = require('assert');
describe('Bracket Skeleton Structure', function () {
    describe('Unsorted Order - 4 Contestants', function () {
        it('Should be: ' +
            '[m1, m2, m3, m4]:, ' +
            'm1(c1, c2) + m2(c3, c4) -> m5, ' +
            'm3 + m4 -> m6, ' +
            'm5 + m6 -> m7, ' +
            'm7 -> m8', function () {
            var c1 = new Contestant_1.Contestant("Al", 1);
            var c2 = new Contestant_1.Contestant("Brittany", 2);
            var c3 = new Contestant_1.Contestant("Chase", 3);
            var c4 = new Contestant_1.Contestant("Danielle", 4);
            var cArr = [c1, c2, c3, c4];
            var m1 = new Matchup_1.Matchup(1, 0, c1, c2);
            var m2 = new Matchup_1.Matchup(1, 1, c3, c4);
            var m3 = new Matchup_1.Matchup(1, 2);
            var m4 = new Matchup_1.Matchup(1, 3);
            var m5 = new Matchup_1.Matchup(1, 4);
            m1.setParent(m5);
            m2.setParent(m5);
            var m6 = new Matchup_1.Matchup(1, 5);
            m3.setParent(m6);
            m4.setParent(m6);
            var m7 = new Matchup_1.Matchup(1, 6);
            m5.setParent(m7);
            m6.setParent(m7);
            var m8 = new Matchup_1.Matchup(1, 7);
            m7.setParent(m8);
            var correctBracket = [m1, m2, m3, m4];
            var datetime = new Date();
            var tournament = new Tournament_1.Tournament("Epic Tournament", "fun", cArr, datetime);
            var bracketService = new bracket_service_service_1.BracketService(tournament);
            bracketService.createUnsortedBracket();
            JSON.parse(JSON.stringify(bracketService.createUnsortedBracket())).should.deep.equal(JSON.parse(JSON.stringify(correctBracket)));
        });
    });
    describe('Unsorted Order - 5 Contestants', function () {
        it('Should be: ' +
            '[m1, m2, m3, m4]:, ' +
            'm1(c1) + m2(c2) -> m5(c1, c2), ' +
            'm3(c3) + m4(c4, c5) -> m6, ' +
            'm5() + m6() -> m7, ' +
            'm7() -> m8', function () {
            var c1 = new Contestant_1.Contestant("Al", 1);
            var c2 = new Contestant_1.Contestant("Brittany", 2);
            var c3 = new Contestant_1.Contestant("Chase", 3);
            var c4 = new Contestant_1.Contestant("Danielle", 4);
            var cArr = [c1, c2, c3, c4];
            var m1 = new Matchup_1.Matchup(1, 0, c1, c2);
            var m2 = new Matchup_1.Matchup(1, 1, c3, c4);
            var m3 = new Matchup_1.Matchup(1, 2);
            var m4 = new Matchup_1.Matchup(1, 3);
            var m5 = new Matchup_1.Matchup(1, 4);
            m1.setParent(m5);
            m2.setParent(m5);
            var m6 = new Matchup_1.Matchup(1, 5);
            m3.setParent(m6);
            m4.setParent(m6);
            var m7 = new Matchup_1.Matchup(1, 6);
            m5.setParent(m7);
            m6.setParent(m7);
            var m8 = new Matchup_1.Matchup(1, 7);
            m7.setParent(m8);
            var correctBracket = [m1, m2, m3, m4];
            var datetime = new Date();
            var tournament = new Tournament_1.Tournament("Epic Tournament", "fun", cArr, datetime);
            var bracketService = new bracket_service_service_1.BracketService(tournament);
            JSON.parse(JSON.stringify(bracketService.createUnsortedBracket())).should.deep.equal(JSON.parse(JSON.stringify(correctBracket)));
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
                bracketService.createUnsortedBracket();
            }
            assert.throws(insufficientContestants, /InsufficientContestants/);
        });
    });
});
