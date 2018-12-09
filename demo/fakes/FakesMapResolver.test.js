"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
// re-align `typeFieldMap` and `fieldMap` (resolve examples and fakes), using a generic `resultResolver`.
// Allow `matches` list for both, using `resolveMatches`
describe('resolveFake', function () {
    var type = 'Person';
    var name = 'firstName';
    var field = {
        type: 'String',
        name: name
    };
    var fake = _1.resolveFakes({ type: type, field: field, name: name });
    describe('fake', function () {
        test('is defined', function () {
            expect(fake).toBeDefined();
        });
    });
    describe('with fields and config', function () {
        var config = {
            maps: {
                fakes: {
                    fieldMap: {
                        word: ['firstName']
                    }
                }
            }
        };
        // should resolve to {faker: 'word', options: {}}
        var fields = ['firstName', 'lastName'];
        var fake = _1.resolveFakes({ type: type, field: field, fields: fields, config: config });
        // console.log('resolveFakes', { fake });
        describe('fake', function () {
            test('is an object', function () {
                expect(typeof fake).toEqual('object');
            });
            test.skip('has a faker', function () {
                expect(fake.faker).toBeDefined();
            });
            test.skip('has options object', function () {
                expect(typeof fake.options).toEqual('object');
            });
        });
    });
});
var FakesMapResolver_1 = require("./FakesMapResolver");
describe('isValidResult', function () {
    var type = 'lorem';
    var value = {
        valid: type,
        empty: null,
        invalid: {
            faker: ['x']
        }
    };
    describe('valid', function () {
        var isValid = FakesMapResolver_1.isValidResult(value.valid);
        // console.log('isValidResult', isValid);
        test('is valid', function () {
            expect(isValid).toBe(true);
        });
    });
    describe('empty', function () {
        var isValid = FakesMapResolver_1.isValidResult(value.empty);
        // console.log('isValidResult', isValid);
        test('is invalid', function () {
            expect(isValid).toBe(false);
        });
    });
    describe('invalid', function () {
        var isValid = FakesMapResolver_1.isValidResult(value.invalid);
        // console.log('isValidResult', isValid);
        test('is type', function () {
            expect(isValid).toBe(false);
        });
    });
});
describe('resolveResult', function () {
    var type = 'lorem';
    var value = {
        type: type
    };
    var fakeObj = FakesMapResolver_1.resolveResult({ value: value });
    var fakeType = fakeObj.faker.type;
    // console.log('resolveResult', { fakeObj, fakeType });
    describe('fakeType', function () {
        test('is type', function () {
            expect(fakeType).toEqual(type);
        });
    });
});
