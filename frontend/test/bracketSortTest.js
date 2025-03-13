"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
(0, chai_1.should)();
var Contestant_1 = require("../src/classes/Contestant");
var bracket_service_service_1 = require("../src/services/bracket-service.service");
var Tournament_1 = require("../src/classes/Tournament");
describe('Creates tournament array', function () {
    describe('Add to tournament, checks order', function () {
        it('', function () {
            var c1 = new Contestant_1.Contestant("Al", 5);
            var c2 = new Contestant_1.Contestant("Brittany", 4);
            var c3 = new Contestant_1.Contestant("Chase", 3);
            var c4 = new Contestant_1.Contestant("Danielle", 2);
            var c5 = new Contestant_1.Contestant("Eric", 1);
            var cArr = [c1, c2, c3, c4, c5];
            var datetime = new Date();
            var tournament = new Tournament_1.Tournament("Epic Tournament", "fun", cArr, datetime);
            var bracketService = new bracket_service_service_1.BracketService(tournament);
            tournament.getMatchups().should.equal([c5, c4, c3, c2, c1]);
        });
    });
});
