"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FakesMapResolver_1 = require("./FakesMapResolver");
exports.FakesMapResolver = FakesMapResolver_1.FakesMapResolver;
// re-align `typeFieldMap` and `fieldMap` (resolve examples and fakes), using a generic `resultResolver`.
// Allow `matches` list for both, using `resolveMatches`
// re-align `typeFieldMap` and `fieldMap` (resolve examples and fakes), using a generic `resultResolver`.
// Allow `matches` list for both, using `resolveMatches`
exports.resolveFakes = function (_a) {
    var type = _a.type, name = _a.name, field = _a.field, _b = _a.fields, fields = _b === void 0 ? [] : _b, _c = _a.config, config = _c === void 0 ? {} : _c;
    return new FakesMapResolver_1.FakesMapResolver({ type: type, name: name, field: field, fields: fields, config: config }).resolve();
};
