"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tournament = void 0;
var Tournament = /** @class */ (function () {
    function Tournament(name, description, contestants, startDate, endDate, prize) {
        this.name = name;
        this.description = description;
        this.contestants = contestants;
        this.startDate = startDate;
        if (endDate) {
            this.endDate = endDate;
        }
        if (prize) {
            this.prize = prize;
        }
        this.matchups = [];
        this.bracket = [];
    }
    //Getters
    Tournament.prototype.getName = function () {
        return this.name;
    };
    Tournament.prototype.getDescription = function () {
        return this.description;
    };
    Tournament.prototype.getContestants = function () {
        return this.contestants;
    };
    Tournament.prototype.getStartDate = function () {
        return this.startDate;
    };
    Tournament.prototype.getEndDate = function () {
        return this.endDate;
    };
    Tournament.prototype.getMatchups = function () {
        return this.matchups;
    };
    Tournament.prototype.getPrize = function () {
        return this.prize;
    };
    Tournament.prototype.getBracket = function () {
        return this.bracket;
    };
    //Setters
    Tournament.prototype.setName = function (name) {
        this.name = name;
    };
    Tournament.prototype.setDescription = function (description) {
        this.description = description;
    };
    Tournament.prototype.setContestants = function (contestants) {
        this.contestants = contestants;
    };
    Tournament.prototype.setStartDate = function (startDate) {
        this.startDate = startDate;
    };
    Tournament.prototype.setEndDate = function (endDate) {
        this.endDate = endDate;
    };
    Tournament.prototype.setMatchups = function (matchups) {
        this.matchups = matchups;
    };
    Tournament.prototype.setPrize = function (prize) {
        this.prize = prize;
    };
    Tournament.prototype.setBracket = function (bracket) {
        this.bracket = bracket;
    };
    return Tournament;
}());
exports.Tournament = Tournament;
