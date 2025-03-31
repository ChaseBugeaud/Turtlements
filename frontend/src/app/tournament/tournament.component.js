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
exports.TournamentComponent = void 0;
var core_1 = require("@angular/core");
var Contestant_1 = require("../../classes/Contestant");
var Tournament_1 = require("../../classes/Tournament");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var TournamentComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'app-tournament',
            imports: [common_1.NgFor, forms_1.FormsModule],
            templateUrl: './tournament.component.html',
            styleUrl: './tournament.component.css'
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var TournamentComponent = _classThis = /** @class */ (function () {
        function TournamentComponent_1() {
            this.startDate = new Date();
            this.tournament = new Tournament_1.Tournament("asdf", "description", [], this.startDate);
        }
        TournamentComponent_1.prototype.addContestantToTournament = function (name) {
            //checks for required field
            if (this.isFilledOut(name)) {
                var contestant = new Contestant_1.Contestant(name);
                this.tournament.addContestant(contestant);
            }
            else {
                console.log("missing fields");
            }
        };
        TournamentComponent_1.prototype.isFilledOut = function (parameter) {
            //checks if field is empty
            return parameter != null && parameter != '';
        };
        TournamentComponent_1.prototype.addDetailsToTournament = function (title, desc, prize, start, end) {
            //checks for required fields and mininum of 2 contestants
            if (this.isFilledOut(title) && this.isFilledOut(desc) && this.isFilledOut(start) && this.tournament.getContestants().length >= 2) {
                this.tournament.setName(title);
                this.tournament.setDescription(desc);
                this.tournament.setPrize(prize);
                this.tournament.setStartDate(start);
                this.tournament.setEndDate(end);
                console.log(this.tournament);
            }
            else {
                //else error message is displayed
                console.log("missing fields");
            }
        };
        TournamentComponent_1.prototype.stringToDate = function (dateString) {
            return new Date(dateString);
        };
        return TournamentComponent_1;
    }());
    __setFunctionName(_classThis, "TournamentComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TournamentComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TournamentComponent = _classThis;
}();
exports.TournamentComponent = TournamentComponent;
