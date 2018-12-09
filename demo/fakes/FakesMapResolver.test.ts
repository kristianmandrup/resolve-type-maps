import { resolveFakes } from '.';

// re-align `typeFieldMap` and `fieldMap` (resolve examples and fakes), using a generic `resultResolver`.
// Allow `matches` list for both, using `resolveMatches`
describe('resolveFake', () => {
  const type = 'Person';
  const name = 'firstName';
  const field = {
    type: 'String',
    name
  };
  const fake = resolveFakes({ type, field, name });
  describe('fake', () => {
    test('is defined', () => {
      expect(fake).toBeDefined();
    });
  });

  describe('with fields and config', () => {
    const config = {
      maps: {
        fakes: {
          fieldMap: {
            word: ['firstName']
          }
        }
      }
    };
    // should resolve to {faker: 'word', options: {}}
    const fields = ['firstName', 'lastName'];

    const fake = resolveFakes({ type, field, fields, config });
    // console.log('resolveFakes', { fake });

    describe('fake', () => {
      test('is an object', () => {
        expect(typeof fake).toEqual('object');
      });

      test.skip('has a faker', () => {
        expect(fake.faker).toBeDefined();
      });

      test.skip('has options object', () => {
        expect(typeof fake.options).toEqual('object');
      });
    });
  });
});

import { resolveResult, isValidResult } from './FakesMapResolver';

describe('isValidResult', () => {
  const type = 'lorem';
  const value = {
    valid: type,
    empty: null,
    invalid: {
      faker: ['x']
    }
  };
  describe('valid', () => {
    const isValid = isValidResult(value.valid);
    // console.log('isValidResult', isValid);

    test('is valid', () => {
      expect(isValid).toBe(true);
    });
  });

  describe('empty', () => {
    const isValid = isValidResult(value.empty);
    // console.log('isValidResult', isValid);

    test('is invalid', () => {
      expect(isValid).toBe(false);
    });
  });

  describe('invalid', () => {
    const isValid = isValidResult(value.invalid);
    // console.log('isValidResult', isValid);
    test('is type', () => {
      expect(isValid).toBe(false);
    });
  });
});

describe('resolveResult', () => {
  const type = 'lorem';
  const value = {
    type
  };
  const fakeObj = resolveResult({ value });
  const fakeType = fakeObj.faker.type;
  // console.log('resolveResult', { fakeObj, fakeType });
  describe('fakeType', () => {
    test('is type', () => {
      expect(fakeType).toEqual(type);
    });
  });
});
