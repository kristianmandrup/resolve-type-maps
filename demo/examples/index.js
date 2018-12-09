"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExamplesMapResolver_1 = require("./ExamplesMapResolver");
exports.ExamplesMapResolver = ExamplesMapResolver_1.ExamplesMapResolver;
// re-align `typeFieldMap` and `fieldMap` (resolve examples and fakes), using a generic `resultResolver`.
// Allow `matches` list for both, using `resolveMatches`
exports.resolveExamples = function (_a) {
    var field = _a.field, type = _a.type, name = _a.name, _b = _a.fields, fields = _b === void 0 ? [] : _b, _c = _a.config, config = _c === void 0 ? {} : _c;
    var resolved = new ExamplesMapResolver_1.ExamplesMapResolver({
        field: field,
        name: name,
        type: type,
        fields: fields,
        config: config
    }).resolve();
    return resolved;
};
