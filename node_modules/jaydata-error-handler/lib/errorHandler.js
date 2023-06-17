"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Exception = (function (_super) {
    __extends(Exception, _super);
    function Exception(message, name, data) {
        _super.call(this);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
        this.name = name || "Exception";
        this.message = message;
        this.data = data;
    }
    Exception.prototype._getStackTrace = function () { };
    return Exception;
}(Error));
exports.Exception = Exception;
var Guard = (function () {
    function Guard() {
    }
    Guard.requireValue = function (name, value) {
        if (typeof value === 'undefined' || value === null) {
            Guard.raise(name + " requires a value other than undefined or null");
        }
    };
    Guard.requireType = function (name, value, typeOrTypes) {
        var types = typeOrTypes instanceof Array ? typeOrTypes : [typeOrTypes];
        return types.some(function (item) {
            switch (typeof item) {
                case "string":
                    return typeof value === item;
                case "function":
                    return value instanceof item;
                default:
                    Guard.raise("Unknown type format : " + typeof item + " for: " + name);
            }
        });
    };
    Guard.raise = function (exception) {
        if (typeof exports.intellisense === 'undefined') {
            if (exception instanceof Exception) {
                console.error(exception.name + ':', exception.message + '\n', exception);
            }
            else {
                console.error(exception);
            }
            throw exception;
        }
    };
    Guard.isNullOrUndefined = function (value) {
        return value === undefined || value === null;
    };
    return Guard;
}());
exports.Guard = Guard;
//# sourceMappingURL=errorHandler.js.map