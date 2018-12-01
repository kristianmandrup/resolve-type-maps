import { FieldMap, resolveFromFieldMap } from './FieldMap';
const fieldMap = {
  name: {}
};

const ctx: any = {
  valid: {
    functions: {
      createKeyMatcher: () => {
        return key => key;
      }
    },
    fieldMap
  },
  invalid: {},
  missingFunctions: {
    fieldMap: {}
  },
  missingFieldMap: {
    functions: {}
  }
};
const config = {
  resolvers: {
    maps: {
      fakes: {
        resolveResult: () => ({ faker: 'x', options: {} })
      }
    }
  },
  maps: {
    fakes: {
      word: ['label', 'caption']
    },
    examples: {
      name: ['john', 'jack']
    }
  }
};
describe('FieldMap', () => {
  describe('new', () => {
    test('missing functions throws', () => {
      expect(() => new FieldMap(ctx.missingFunctions, config)).toThrow();
    });

    test('missing fieldMap throws', () => {
      expect(() => new FieldMap(ctx.missingFieldMap, config)).toThrow();
    });

    test('valid ctx does not throw', () => {
      expect(() => new FieldMap(ctx.valid, config)).not.toThrow();
    });
  });

  describe('instance', () => {
    const fieldMap = new FieldMap(ctx.valid, config);
    test('defined', () => {
      expect(fieldMap).toBeDefined();
    });

    describe('resolve', () => {
      const resolved = fieldMap.resolve();
      // console.log('resolve', resolved);

      test('resolved', () => {
        expect(resolved).toEqual('name');
      });
    });
  });
});

describe('resolveFromFieldMap', () => {
  const resolved = resolveFromFieldMap(ctx.valid, config);
  // console.log('resolveFromFieldMap', resolved);

  test('resolved', () => {
    expect(resolved).toEqual('name');
  });
});
