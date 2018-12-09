import { MapResolver, resolveFromMap } from './MapResolver';
import { createKeyResolver } from '../common/KeyMatcher';

const values = ['john', 'jack'];
const nameEntry = {
  matches: [/title/, 'label'],
  values
};

const map = {
  name: nameEntry
};

const ctx: any = {
  valid: {
    name: 'label',
    functions: {
      isValidResult: obj => Boolean(obj.values),
      resolveResult: obj => obj.values,
      createKeyResolver
    },
    map
  },
  invalid: {},
  missingFunctions: {
    map: {}
  },
  missingFieldMap: {
    functions: {}
  }
};

const config = {};
describe('FieldMap', () => {
  describe('new', () => {
    test('missing functions throws', () => {
      expect(() => new MapResolver(ctx.missingFunctions, config)).toThrow();
    });

    test('missing fieldMap throws', () => {
      expect(() => new MapResolver(ctx.missingFieldMap, config)).toThrow();
    });

    test('valid ctx does not throw', () => {
      expect(() => new MapResolver(ctx.valid, config)).not.toThrow();
    });
  });

  describe('instance', () => {
    const fieldMap = new MapResolver(ctx.valid, config);
    test('defined', () => {
      expect(fieldMap).toBeDefined();
    });

    describe('resolve', () => {
      const resolved = fieldMap.resolve();
      test('resolved', () => {
        expect(resolved).toEqual(values);
      });
    });
  });
});

describe('resolveFromMap', () => {
  const resolved = resolveFromMap(ctx.valid, config);
  // console.log('resolveFromMap', resolved);

  test('resolved', () => {
    expect(resolved).toEqual(values);
  });
});
