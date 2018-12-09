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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var maps = __importStar(require("../maps"));
var TypeMapResolver_1 = require("../../src/lib/TypeMapResolver");
exports.isValidResult = function (value) {
    if (!value)
        return false;
    var testVal = value.faker || value;
    return Boolean(typeof testVal === 'string');
};
exports.resolveResult = function (_a) {
    var _b = _a === void 0 ? {} : _a, value = _b.value, _c = _b.key, key = _c === void 0 ? value : _c;
    var $default = { faker: key, options: {} };
    if (value.faker) {
        return { faker: value.faker, options: value.options || {} };
    }
    return $default;
};
var FakesMapResolver = /** @class */ (function (_super) {
    __extends(FakesMapResolver, _super);
    function FakesMapResolver(ctx, config) {
        if (ctx === void 0) { ctx = {}; }
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, ctx, __assign({ mapName: 'fakes', maps: maps }, config)) || this;
        _this.functions = __assign({}, _this.functions, { resolveResult: exports.resolveResult,
            isValidResult: exports.isValidResult });
        return _this;
    }
    return FakesMapResolver;
}(TypeMapResolver_1.TypeMapResolver));
exports.FakesMapResolver = FakesMapResolver;
