"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
// re-align `typeFieldMap` and `fieldMap` (resolve examples and fakes), using a generic `resultResolver`.
// Allow `matches` list for both, using `resolveMatches`
describe('resolveExample', function () {
    var name = 'firstName';
    var field = {
        name: name,
        type: 'String'
    };
    var functions = {
        resolveResult: function (obj) { return obj; }
    };
    var type = 'Person';
    var example = _1.resolveExamples({ field: field, name: name, type: type, functions: functions });
    describe('example', function () {
        test('is defined', function () {
            expect(example).toBeDefined();
        });
    });
});
var ExamplesMapResolver_1 = require("./ExamplesMapResolver");
describe('ExampleResolver', function () {
    var field = {
        name: 'firstName',
        type: 'String'
    };
    var type = 'Person';
    var resolver = new ExamplesMapResolver_1.ExamplesMapResolver({ field: field, type: type });
    describe('resolver', function () {
        test('is defined', function () {
            expect(resolver).toBeDefined();
        });
    });
});
describe('resolveResult', function () {
    var values = ['x', 'y'];
    var obj = {
        values: ['x', 'y']
    };
    var resolved = ExamplesMapResolver_1.resolveResult(obj);
    // console.log('resolveResult', { values });
    describe('resolved', function () {
        test('is values', function () {
            expect(resolved).toEqual(values);
        });
    });
});
