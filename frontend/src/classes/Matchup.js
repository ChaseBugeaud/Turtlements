"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matchup = void 0;
var Matchup = /** @class */ (function () {
    function Matchup(bestOfCount, spot, contestant1, contestant2) {
        if (contestant1) {
            this.contestant1 = contestant1;
        }
        if (contestant2) {
            this.contestant2 = contestant2;
        }
        this.bestOfCount = bestOfCount;
        this.games = [];
        if (spot) {
            this.spot = spot;
        }
        this.leftChild = undefined;
        this.rightChild = undefined;
    }
    //Getters
    Matchup.prototype.getContestant1 = function () {
        return this.contestant1;
    };
    Matchup.prototype.getContestant2 = function () {
        return this.contestant2;
    };
    Matchup.prototype.getContestantCount = function () {
        var count = 0;
        if (this.contestant1)
            count++;
        if (this.contestant2)
            count++;
        return count;
    };
    Matchup.prototype.getBestOfCount = function () {
        return this.bestOfCount;
    };
    Matchup.prototype.getGames = function () {
        return this.games;
    };
    Matchup.prototype.getWinner = function () {
        if (!this.contestant2) {
            this.winner = this.contestant1;
        }
        return this.winner;
    };
    Matchup.prototype.getSpot = function () {
        return this.spot;
    };
    Matchup.prototype.getLeftChild = function () {
        return this.leftChild;
    };
    Matchup.prototype.getRightChild = function () {
        return this.rightChild;
    };
    //Setters
    Matchup.prototype.setContestant1 = function (contestant1) {
        this.contestant1 = contestant1;
    };
    Matchup.prototype.setContestant2 = function (contestant2) {
        this.contestant2 = contestant2;
    };
    Matchup.prototype.setBestOfCount = function (bestOfCount) {
        this.bestOfCount = bestOfCount;
    };
    Matchup.prototype.addGame = function (game) {
        //See if any contestant has won more than half the games, set winner accordingly
        var c1Wins = 0;
        var c2Wins = 0;
        for (var i = 0; i < this.games.length; i++) {
            if (this.games[i].getWinner() === this.contestant1) {
                c1Wins++;
            }
            else if (this.games[i].getWinner() === this.contestant2) {
                c2Wins++;
            }
        }
        if (c1Wins >= this.bestOfCount) {
            this.winner = this.contestant1;
        }
        else if (c2Wins >= this.bestOfCount) {
            this.winner = this.contestant2;
        }
        this.games.push(game);
    };
    Matchup.prototype.removeGame = function (index) {
        if (this.games.length < index) {
            console.error("index: ", index, "exceeds max game index: ", this.games.length);
            return null;
        }
        else {
            //unset winner when removing a game
            if (this.winner) {
                this.winner = undefined;
            }
            return this.games.splice(index, 1);
        }
    };
    Matchup.prototype.setWinner = function (winner) {
        this.winner = winner;
    };
    Matchup.prototype.setSpot = function (spot) {
        this.spot = spot;
    };
    Matchup.prototype.setLeftChild = function (leftChild) {
        this.leftChild = leftChild;
    };
    Matchup.prototype.setRightChild = function (rightChild) {
        this.rightChild = rightChild;
    };
    return Matchup;
}());
exports.Matchup = Matchup;
