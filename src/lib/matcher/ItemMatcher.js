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
Object.defineProperty(exports, "__esModule", { value: true });
var BaseMapResolver_1 = require("../BaseMapResolver");
var ItemMatcher = /** @class */ (function (_super) {
    __extends(ItemMatcher, _super);
    function ItemMatcher(ctx, config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, ctx, config) || this;
        var matchItem = ctx.matchItem, name = ctx.name;
        _this.matchItem = matchItem;
        if (!name) {
            _this.error('missing name', ctx);
        }
        _this.name = name;
        return _this;
    }
    ItemMatcher.prototype.match = function () {
        return this.resolveMatchItem();
    };
    ItemMatcher.prototype.resolveMatchItem = function () {
        return this.resolveMatchFn() || this.resolveStringOrRegExp();
    };
    ItemMatcher.prototype.resolveMatchFn = function () {
        if (typeof this.matchItem !== 'function')
            return;
        return this.matchItem(this.name, this);
    };
    ItemMatcher.prototype.resolveStringOrRegExp = function () {
        var regExp = this.prepareRegExp(this.matchItem);
        return regExp ? regExp.test(this.name) : false;
    };
    ItemMatcher.prototype.prepareRegExp = function (matchExpr) {
        if (!matchExpr) {
            this.error('Invalid match expression', {
                matchExpr: matchExpr,
                ctx: this.ctx
            });
        }
        var regExpOpts = this.ctx.regExpOpts;
        regExpOpts = regExpOpts || 'i';
        return matchExpr instanceof RegExp
            ? matchExpr
            : new RegExp(matchExpr, regExpOpts);
    };
    return ItemMatcher;
}(BaseMapResolver_1.BaseMapResolver));
exports.ItemMatcher = ItemMatcher;
