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
var Base_1 = require("./Base");
var BaseMapResolver = /** @class */ (function (_super) {
    __extends(BaseMapResolver, _super);
    function BaseMapResolver(ctx, config) {
        if (ctx === void 0) { ctx = {}; }
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, config) || this;
        _this.ctx = ctx;
        var functions = ctx.functions || {};
        _this.functions = functions;
        return _this;
    }
    BaseMapResolver.prototype.mapsFor = function (name, defaultMap) {
        if (defaultMap === void 0) { defaultMap = {}; }
        var maps = this.config.maps || defaultMap || {};
        return maps[name] || {};
    };
    BaseMapResolver.prototype.mapsDataFor = function (name, defaultMap) {
        if (defaultMap === void 0) { defaultMap = {}; }
        return this.mapsFor(name, defaultMap).data || {};
    };
    BaseMapResolver.prototype.resolversFor = function (name) {
        return this.mapsFor(name).resolvers || {};
    };
    BaseMapResolver.prototype.factoriesFor = function (name) {
        return this.mapsFor(name).factories || {};
    };
    return BaseMapResolver;
}(Base_1.Base));
exports.BaseMapResolver = BaseMapResolver;
