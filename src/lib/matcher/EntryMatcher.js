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
var BaseMapResolver_1 = require("../BaseMapResolver");
var ItemMatcher_1 = require("./ItemMatcher");
// const lower = (str: string) => str.toLowerCase();
var capitalize = function (str) { return str.replace(/^\w/, function (c) { return c.toUpperCase(); }); };
var EntryMatcher = /** @class */ (function (_super) {
    __extends(EntryMatcher, _super);
    function EntryMatcher(ctx, config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, ctx, config) || this;
        var name = ctx.name;
        if (!name) {
            _this.error('missing name', ctx);
        }
        _this.name = name;
        var resolveResult = _this.functions.resolveResult;
        if (!resolveResult) {
            _this.error('missing resolveResult in resolvers map of config', {
                name: _this.name,
                functions: _this.functions,
                config: config
            });
        }
        _this.resolveResult = resolveResult;
        return _this;
    }
    EntryMatcher.prototype.resolveMatches = function (obj, key, opts) {
        if (opts === void 0) { opts = {}; }
        if (typeof key !== 'string') {
            this.error('resolveMatches: missing or invalid key', {
                obj: obj,
                key: key
            });
        }
        if (!obj) {
            this.error('resolveMatches: invalid entry object', {
                obj: obj,
                key: key
            });
        }
        if (typeof obj === 'string') {
            return this.defaultMatches(obj, opts);
        }
        var matches = obj.match || obj.matches || key;
        return Array.isArray(matches) ? matches : [matches];
    };
    EntryMatcher.prototype.defaultMatches = function (str, opts) {
        if (opts === void 0) { opts = {}; }
        return opts.isType ? [str, capitalize(str)] : [str];
    };
    EntryMatcher.prototype.matchResult = function (obj, matches) {
        if (!this.resolveResult) {
            this.error('missing function: resolveResult', this.ctx);
        }
        // todo: make generic
        var isMatching = this.findMatch(matches || []);
        var result = isMatching ? this.resolveResult(obj) : null;
        return result;
    };
    EntryMatcher.prototype.findMatch = function (matches) {
        var _this = this;
        if (!Array.isArray(matches)) {
            this.error('findMatch: Invalid matches. Must be an array or object with a find function', { matches: matches });
        }
        if (typeof matches.find !== 'function') {
            this.error('matches missing find function', { matches: matches });
        }
        var matched = matches.find(function (matchItem) {
            var matcher = _this.createItemMatcher(matchItem);
            return matcher.match();
        });
        return Boolean(matched);
    };
    EntryMatcher.prototype.createItemMatcher = function (matchItem) {
        return new ItemMatcher_1.ItemMatcher(__assign({ matchItem: matchItem }, this.ctx), this.config);
    };
    return EntryMatcher;
}(BaseMapResolver_1.BaseMapResolver));
exports.EntryMatcher = EntryMatcher;
