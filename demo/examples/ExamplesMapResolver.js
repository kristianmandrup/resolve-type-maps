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
var TypeMapResolver_1 = require("../../src/lib/TypeMapResolver");
exports.isValidResult = Array.isArray;
exports.resolveResult = function (obj) {
    if (Array.isArray(obj))
        return obj;
    if (obj.values)
        return obj.values;
};
var ExamplesMapResolver = /** @class */ (function (_super) {
    __extends(ExamplesMapResolver, _super);
    function ExamplesMapResolver(ctx, config) {
        if (ctx === void 0) { ctx = {}; }
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, ctx, config) || this;
        _this.functions = __assign({}, _this.functions, { isValidResult: exports.isValidResult,
            resolveResult: exports.resolveResult });
        return _this;
    }
    return ExamplesMapResolver;
}(TypeMapResolver_1.TypeMapResolver));
exports.ExamplesMapResolver = ExamplesMapResolver;
