"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = __importStar(require("path"));
var Base = /** @class */ (function () {
    function Base(config) {
        var _this = this;
        this.log = function (msg, data) {
            data
                ? console.error(_this.label, msg, data)
                : console.error(_this.label, msg);
        };
        this.warn = function (msg, data) {
            data
                ? console.error(_this.label, msg, data)
                : console.error(_this.label, msg);
        };
        this.error = function (msg, data) {
            msg = [_this.label, msg].join(' ');
            data ? console.error(msg, data) : console.error(msg);
            throw new Error(msg);
        };
        this.config = config;
        if (this.isEnabled('logging')) {
            config.log = config.log || console.log;
        }
        if (config.log) {
            this.log = config.log;
        }
        this.className = this.constructor['name'];
    }
    Object.defineProperty(Base.prototype, "label", {
        get: function () {
            return "[" + this.className + "]";
        },
        enumerable: true,
        configurable: true
    });
    Base.prototype.isEnabled = function (name) {
        var enabled = this.config.enable || {};
        return enabled[name];
    };
    Object.defineProperty(Base.prototype, "rootPath", {
        get: function () {
            return path.join(__dirname, '..');
        },
        enumerable: true,
        configurable: true
    });
    Base.prototype.isObject = function (obj) {
        return obj === Object(obj);
    };
    Base.prototype.isFullObject = function (obj) {
        return obj === Object(obj) && Object.keys(obj).length > 0;
    };
    Base.prototype.validateFunction = function (_a) {
        var method = _a.method, functionName = _a.functionName, func = _a.func, data = _a.data, error = _a.error;
        var _b;
        if (typeof func !== 'function') {
            error(method + ": missing or invalid " + functionName + " function", __assign((_b = {}, _b[functionName] = func, _b), data));
        }
    };
    return Base;
}());
exports.Base = Base;
