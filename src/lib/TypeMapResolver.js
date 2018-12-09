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
var BaseMapResolver_1 = require("./BaseMapResolver");
var MapResolver_1 = require("./MapResolver");
var KeyMatcher_1 = require("./matcher/KeyMatcher");
exports.createTypeMapResolver = function (ctx, config) {
    return new TypeMapResolver(ctx, config);
};
var TypeMapResolver = /** @class */ (function (_super) {
    __extends(TypeMapResolver, _super);
    function TypeMapResolver(ctx, config) {
        if (ctx === void 0) { ctx = {}; }
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, ctx, config) || this;
        var type = ctx.type, field = ctx.field, name = ctx.name, mapName = ctx.mapName, map = ctx.map;
        var error = config.error;
        var log = config.log || console.log;
        var typeName = typeof type === 'string' ? type : type.name;
        if (!field) {
            _this.error('missing field in ctx', ctx);
        }
        var functions = ctx.functions || {};
        var fieldName = field.name;
        var fieldType = field.type;
        _this.init(mapName, { maps: config.maps, map: map });
        _this.mapName = mapName;
        var resolvers = _this.resolversFor(mapName);
        var factories = _this.resolversFor(mapName);
        _this.resolveFromMap = resolvers.resolveFromMap || MapResolver_1.resolveFromMap;
        // console.log('' + resolvers.resolveResult);
        _this.functions = __assign({}, functions, _this.defaultFactories, factories, resolvers);
        _this.mapResolved = {};
        _this.context = {
            mapName: mapName,
            functions: _this.functions,
            type: type,
            field: field,
            name: name || fieldName,
            typeName: typeName,
            fieldName: fieldName,
            fieldType: fieldType,
            config: config,
            error: error,
            log: log
        };
        return _this;
    }
    TypeMapResolver.prototype.init = function (name, _a) {
        var maps = _a.maps, map = _a.map;
        var confMap = map || this.mapsDataFor(name, maps);
        this.functions = __assign({}, this.functions);
        this.typeFieldMap = confMap.typeMap || {};
        this.fieldMap = confMap.fieldMap || {};
    };
    TypeMapResolver.prototype.resolve = function () {
        var result;
        this.mapResolved = {};
        var resolvedTypeMap = this.resolveTypeMap();
        if (resolvedTypeMap) {
            result = this.resolveFieldMap(resolvedTypeMap);
        }
        result = result || this.resolveFieldMap();
        return result;
    };
    TypeMapResolver.prototype.resolveTypeMap = function () {
        var result = this.resolveMap(this.typeFieldMap, { isType: true });
        if (result) {
            this.mapResolved.typeMap = true;
        }
        return result;
    };
    TypeMapResolver.prototype.resolveFieldMap = function (map) {
        if (map === void 0) { map = this.fieldMap; }
        var result = this.resolveMap(map);
        if (result) {
            this.mapResolved.fieldMap = true;
        }
        return result;
    };
    Object.defineProperty(TypeMapResolver.prototype, "defaultFactories", {
        get: function () {
            return {
                createKeyMatcher: KeyMatcher_1.createKeyMatcher,
                createKeyResolver: KeyMatcher_1.createKeyResolver
            };
        },
        enumerable: true,
        configurable: true
    });
    TypeMapResolver.prototype.resolveMap = function (map, opts) {
        if (opts === void 0) { opts = {}; }
        return this.resolveFromMap(__assign({ opts: opts,
            map: map }, this.context), this.config);
    };
    return TypeMapResolver;
}(BaseMapResolver_1.BaseMapResolver));
exports.TypeMapResolver = TypeMapResolver;
