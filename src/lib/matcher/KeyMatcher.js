"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
var EntryMatcher_1 = require("./EntryMatcher");
function createKeyMatcher(ctx, config) {
    if (config === void 0) { config = {}; }
    return new KeyMatcher(ctx, config);
}
exports.createKeyMatcher = createKeyMatcher;
function createKeyResolver(ctx, config) {
    if (config === void 0) { config = {}; }
    return createKeyMatcher(ctx, config).resolve;
}
exports.createKeyResolver = createKeyResolver;
var KeyMatcher = /** @class */ (function (_super) {
    __extends(KeyMatcher, _super);
    function KeyMatcher(ctx, config) {
        if (ctx === void 0) { ctx = {}; }
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, ctx, config) || this;
        // key being iterated on fieldMap
        _this.resolve = function (key) {
            var _a = _this, isValidResult = _a.isValidResult, map = _a.map, name = _a.name;
            var entryObj = map[key];
            if (!entryObj) {
                _this.error('resolve: invalid map key', {
                    key: key,
                    entryObj: entryObj
                });
            }
            var matches = _this.resolveMatches(entryObj, name, _this.opts);
            _this.validateMatches(matches, key, entryObj);
            if (!isValidResult(entryObj)) {
                return false;
            }
            var matched = _this.matchResult(entryObj, matches);
            return matched;
        };
        var name = ctx.name, functions = ctx.functions, map = ctx.map, opts = ctx.opts;
        if (!functions) {
            _this.error('missing functions entry on context');
        }
        _this.functions = functions;
        _this.opts = opts || {};
        var isValidResult = functions.isValidResult;
        if (typeof isValidResult !== 'function') {
            _this.error('isValidResult is not a function', {
                isValidResult: isValidResult,
                functions: functions,
                ctx: ctx,
                config: config
            });
        }
        _this.isValidResult = isValidResult;
        _this.map = map;
        _this.name = name;
        return _this;
    }
    KeyMatcher.prototype.validateMatches = function (matches, key, obj) {
        return Array.isArray(matches)
            ? true
            : this.error("resolveArray: " + key + " missing matches array. Invalid " + matches, __assign({ key: key,
                obj: obj,
                matches: matches }, this.ctx));
    };
    return KeyMatcher;
}(EntryMatcher_1.EntryMatcher));
exports.KeyMatcher = KeyMatcher;
