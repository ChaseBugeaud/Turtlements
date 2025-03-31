"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@angular/compiler");
var chai_1 = require("chai");
(0, chai_1.should)();
var tournament_component_1 = require("../src/app/tournament/tournament.component");
describe('Tournament Object Creation Tests', function () {
    describe('update tournament object (title) with form details', function () {
        it('should update tournament title to epic', function () {
            var t1 = new tournament_component_1.TournamentComponent;
            t1.addContestantToTournament("Chase");
            t1.addContestantToTournament("Preet");
            t1.addDetailsToTournament("epic", "awesome", "cool", new Date("2022-03-25"), new Date("2022-03-26"));
            t1.tournament.getName().should.equal("epic");
        });
    });
    describe('add contestant with empty name field', function () {
        it('should not let you add contestant to list', function () {
            var t2 = new tournament_component_1.TournamentComponent;
            t2.addContestantToTournament("");
            t2.tournament.getContestants().length.should.equal(0);
        });
    });
    describe('create tournament with required field (title) not filled out', function () {
        it('should not update tournament object without required field, name should stay default', function () {
            var t3 = new tournament_component_1.TournamentComponent;
            t3.addDetailsToTournament("", "test desc", "test prize", new Date("2022-12-25"), new Date("2022-12-26"));
            t3.tournament.getName().should.equal("asdf");
        });
    });
    describe('add contestant to tournament', function () {
        it('should add contestant to contestant list', function () {
            var t4 = new tournament_component_1.TournamentComponent;
            t4.addContestantToTournament("Clara");
            t4.tournament.getContestants().length.should.equal(1);
        });
    });
    describe('create tournament with no contestants added', function () {
        it('should not update tournament object without required contestants, details should stay default', function () {
            var t3 = new tournament_component_1.TournamentComponent;
            t3.addDetailsToTournament("yahoo", "yipee", "weeeee", new Date("2005-01-17"), new Date("2025-01-17"));
            t3.tournament.getName().should.equal("asdf");
        });
    });
});
