"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var Game = /** @class */ (function () {
    function Game(winner, contestant1, contestant2) {
        this.winner = winner;
        this.contestant1 = contestant1;
        if (contestant2) {
            this.contestant2 = contestant2;
        }
    }
    //Getters
    Game.prototype.getWinner = function () {
        return this.winner;
    };
    Game.prototype.getContestant1 = function () {
        return this.contestant1;
    };
    Game.prototype.getContestant2 = function () {
        return this.contestant2;
    };
    //Setters
    Game.prototype.overrideWinner = function (winner) {
        this.winner = winner;
    };
    Game.prototype.setContestant1 = function (contestant1) {
        this.contestant1 = contestant1;
    };
    Game.prototype.setContestant2 = function (contestant2) {
        this.contestant2 = contestant2;
    };
    return Game;
}());
exports.Game = Game;
