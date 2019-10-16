"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("./internal/Observable");
require("./internal/observable/dom/MiscJSDoc");
var ObservableDoc = (function () {
    function ObservableDoc() {
    }
    ObservableDoc.create = function (onSubscription) {
        return new Observable_1.Observable(onSubscription);
    };
    return ObservableDoc;
}());
exports.ObservableDoc = ObservableDoc;
var ObserverDoc = (function () {
    function ObserverDoc() {
        this.closed = false;
    }
    ObserverDoc.prototype.next = function (value) {
        return void 0;
    };
    ObserverDoc.prototype.error = function (err) {
        return void 0;
    };
    ObserverDoc.prototype.complete = function () {
        return void 0;
    };
    return ObserverDoc;
}());
exports.ObserverDoc = ObserverDoc;
var SubscribableOrPromiseDoc = (function () {
    function SubscribableOrPromiseDoc() {
    }
    return SubscribableOrPromiseDoc;
}());
exports.SubscribableOrPromiseDoc = SubscribableOrPromiseDoc;
var ObservableInputDoc = (function () {
    function ObservableInputDoc() {
    }
    return ObservableInputDoc;
}());
exports.ObservableInputDoc = ObservableInputDoc;
var TeardownLogicDoc = (function () {
    function TeardownLogicDoc() {
    }
    return TeardownLogicDoc;
}());
exports.TeardownLogicDoc = TeardownLogicDoc;
//# sourceMappingURL=MiscJSDoc.js.map