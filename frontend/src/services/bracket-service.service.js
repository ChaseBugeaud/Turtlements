"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BracketService = void 0;
var core_1 = require("@angular/core");
var Matchup_1 = require("../classes/Matchup");
var BracketService = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var BracketService = _classThis = /** @class */ (function () {
        function BracketService_1(tournament) {
            this.tournament = tournament;
            this.contestants = this.tournament.getContestants();
            this.numContestants = this.contestants.length;
        }
        BracketService_1.prototype.ceilPowerOf2 = function () {
            //next power of 2 is Math.ceil(log2(numContestants))
            return Math.pow(2, Math.ceil(Math.log2(this.numContestants)));
        };
        BracketService_1.prototype.calculateByes = function () {
            if (this.numContestants < 2)
                throw new Error("InsufficientContestants");
            if (this.ceilPowerOf2() === this.numContestants) {
                return 0;
            }
            else {
                return this.ceilPowerOf2() - this.numContestants;
            }
        };
        BracketService_1.prototype.calculateMatchupCount = function () {
            if (this.numContestants < 2)
                throw new Error("InsufficientContestants");
            return this.ceilPowerOf2() - 1;
        };
        BracketService_1.prototype.sortContestants = function () {
            if (this.contestants.length < 1)
                throw new Error("InsufficientContestants");
            this.contestants.sort(this.seedCompare);
        };
        BracketService_1.prototype.seedCompare = function (c1, c2) {
            if (c1.getSeed() < c2.getSeed()) {
                return -1;
            }
            else if (c1.getSeed() > c2.getSeed()) {
                return 1;
            }
            else {
                return 0;
            }
        };
        BracketService_1.prototype.createUnsortedBracket = function () {
            //TODO: fix
            if (this.numContestants < 2) {
                throw new Error("InsufficientContestants");
            }
            var firstRound = [];
            var contestantsCopy = JSON.parse(JSON.stringify(this.contestants));
            var bracketSpot = 0;
            var bracket = [];
            //create byes
            for (var i = 0; i < this.calculateByes(); i++, bracketSpot++) {
                var c1 = contestantsCopy.shift();
                var m = new Matchup_1.Matchup(1, bracketSpot, c1);
                firstRound.push(m);
            }
            //calculate first round with instantiated contestants
            for (var i = 0; contestantsCopy.length; i += 2, bracketSpot++) {
                var c1 = contestantsCopy.shift();
                var c2 = contestantsCopy.shift();
                var m = new Matchup_1.Matchup(1, bracketSpot, c1, c2);
                firstRound.push(m);
            }
            bracket.push(firstRound);
            //create shell for bracket - empty matchups with no contestants
            while (bracket.length < (this.ceilPowerOf2() / 2)) {
                var previousRound = bracket[bracket.length - 1];
                var matchupCount = Math.ceil(previousRound.length / 2);
                var currentRound = [];
                for (var j = 0; j < matchupCount; j++, bracketSpot++) {
                    var m = new Matchup_1.Matchup(1, bracketSpot);
                    currentRound.push(m);
                }
                bracket.push(currentRound);
            }
            //console.log("bracket\n", bracket)
            this.tournament.setBracket(bracket);
        };
        return BracketService_1;
    }());
    __setFunctionName(_classThis, "BracketService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BracketService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BracketService = _classThis;
}();
exports.BracketService = BracketService;
