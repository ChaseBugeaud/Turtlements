"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contestant = void 0;
var Contestant = /** @class */ (function () {
    function Contestant(name, seed) {
        this.name = name;
        if (seed) {
            this.seed = seed;
        }
    }
    //Getters
    Contestant.prototype.getName = function () {
        return this.name;
    };
    Contestant.prototype.getSeed = function () {
        return this.seed;
    };
    //Setters
    Contestant.prototype.setName = function (name) {
        this.name = name;
    };
    Contestant.prototype.setSeed = function (seed) {
        this.seed = seed;
    };
    return Contestant;
}());
exports.Contestant = Contestant;
