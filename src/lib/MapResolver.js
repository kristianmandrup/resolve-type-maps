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
function resolveFromMap(ctx, config) {
    var resolver = createMapResolver(ctx, config);
    return resolver.resolve();
}
exports.resolveFromMap = resolveFromMap;
function createMapResolver(ctx, config) {
    return new MapResolver(ctx, config);
}
exports.createMapResolver = createMapResolver;
var MapResolver = /** @class */ (function (_super) {
    __extends(MapResolver, _super);
    function MapResolver(ctx, config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, config) || this;
        _this.ctx = ctx;
        _this.name = ctx.name;
        var map = ctx.map, functions = ctx.functions;
        if (!functions) {
            _this.error('missing functions entry on context');
        }
        if (!_this.isObject(map)) {
            _this.error('missing map');
        }
        var createKeyResolver = functions.createKeyResolver, createKeyMatcher = functions.createKeyMatcher;
        if (typeof createKeyResolver !== 'function') {
            _this.error('Invalid createKeyResolver. Must be a function', {
                createKeyResolver: createKeyResolver,
                functions: functions,
                ctx: ctx
            });
        }
        var resolveKey = createKeyResolver
            ? createKeyResolver(_this.ctx, _this.config)
            : createKeyMatcher(ctx, config).resolve;
        if (typeof resolveKey !== 'function') {
            _this.error('Invalid resolveKey. Must be a function', {
                resolveKey: resolveKey,
                ctx: ctx
            });
        }
        _this.map = map;
        _this.resolveKey = resolveKey;
        return _this;
    }
    MapResolver.prototype.resolve = function () {
        var map = this.map;
        if (!this.isFullObject(map)) {
            this.warn('no keys in map', {
                map: map
            });
            return null;
        }
        var keys = Object.keys(map);
        // console.log('resolve', { keys, name: this.name, map });
        var result;
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            result = this.resolveKey(key);
            if (result)
                break;
        }
        return result;
    };
    return MapResolver;
}(Base_1.Base));
exports.MapResolver = MapResolver;
