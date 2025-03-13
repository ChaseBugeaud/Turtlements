"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
(0, chai_1.should)();
var Contestant_1 = require("../src/classes/Contestant");
var Tournament_1 = require("../src/classes/Tournament");
var bracket_service_service_1 = require("../src/services/bracket-service.service");
describe('Calculate Bye Count', function () {
    describe('4 Contestants', function () {
        it('0 byes', function () {
            var c1 = new Contestant_1.Contestant("Al", 1);
            var c2 = new Contestant_1.Contestant("Brittany", 2);
            var c3 = new Contestant_1.Contestant("Chase", 3);
            var c4 = new Contestant_1.Contestant("Danielle", 4);
            var cArr = [c1, c2, c3, c4];
            var datetime = new Date();
            var tournament = new Tournament_1.Tournament("Epic Tournament", "fun", cArr, datetime);
            var bracketService = new bracket_service_service_1.BracketService(tournament);
            bracketService.calculateByes().should.equal(0);
        });
        describe('5 Contestants', function () {
            it('3 byes', function () {
                var c1 = new Contestant_1.Contestant("Al", 1);
                var c2 = new Contestant_1.Contestant("Brittany", 2);
                var c3 = new Contestant_1.Contestant("Chase", 3);
                var c4 = new Contestant_1.Contestant("Danielle", 4);
                var c5 = new Contestant_1.Contestant("Eric", 5);
                var cArr = [c1, c2, c3, c4, c5];
                var datetime = new Date();
                var tournament = new Tournament_1.Tournament("Epic Tournament", "fun", cArr, datetime);
                var bracketService = new bracket_service_service_1.BracketService(tournament);
                bracketService.calculateByes().should.equal(3);
            });
        });
    });
});
