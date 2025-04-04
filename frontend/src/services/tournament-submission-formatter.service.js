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
exports.TournamentSubmissionFormatterService = void 0;
var core_1 = require("@angular/core");
var uuidv7_1 = require("uuidv7");
var TournamentSubmissionFormatterService = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var TournamentSubmissionFormatterService = _classThis = /** @class */ (function () {
        function TournamentSubmissionFormatterService_1() {
        }
        TournamentSubmissionFormatterService_1.prototype.formatTournament = function (tournament) {
            var returnTournament = {
                name: tournament.getName(),
                start_date: tournament.getStartDate(),
                end_date: tournament.getEndDate(),
                desc: tournament.getDescription(),
                prize: tournament.getPrize()
            };
            return returnTournament;
        };
        TournamentSubmissionFormatterService_1.prototype.formatContestants = function (tournament, forcedUUIDs) {
            //formats all contestants with a unique UUID
            var contestantArray = tournament.getContestants();
            var miniArray = [];
            if (!forcedUUIDs) {
                for (var i = 0; i < contestantArray.length; i++) {
                    miniArray.push({
                        id: (0, uuidv7_1.uuidv7)(),
                        name: contestantArray[i].getName(),
                        seed: contestantArray[i].getSeed()
                    });
                }
            }
            else {
                for (var i = 0; i < contestantArray.length; i++) {
                    miniArray.push({
                        id: forcedUUIDs[i],
                        name: contestantArray[i].getName(),
                        seed: contestantArray[i].getSeed()
                    });
                }
            }
            return miniArray;
        };
        TournamentSubmissionFormatterService_1.prototype.formatMatchups = function (tournament) {
            var returnMatchups = [];
            tournament.getBracket().forEach(function (matchupArr) {
                for (var i = 0; i < matchupArr.length; i++) {
                    if (matchupArr[i].getContestant1() && matchupArr[i].getContestant2()) {
                    }
                }
            });
            return returnMatchups;
        };
        TournamentSubmissionFormatterService_1.prototype.formatSponsor = function (tournament) {
            var returnSponsors;
            return returnSponsors;
        };
        TournamentSubmissionFormatterService_1.prototype.formatBody = function (tournament) {
            var returnObject = {
                tournament: this.formatTournament(tournament),
                contestants: this.formatContestants(tournament),
                matchups: this.formatMatchups(tournament),
                sponsor: this.formatSponsor(tournament)
            };
            return returnObject;
        };
        return TournamentSubmissionFormatterService_1;
    }());
    __setFunctionName(_classThis, "TournamentSubmissionFormatterService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TournamentSubmissionFormatterService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TournamentSubmissionFormatterService = _classThis;
}();
exports.TournamentSubmissionFormatterService = TournamentSubmissionFormatterService;
