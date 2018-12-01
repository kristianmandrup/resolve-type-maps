import { createKeyMatcher, KeyMatcher } from './KeyMatcher';

// re-align `typeFieldMap` and `fieldMap` (resolve examples and fakes), using a generic `resultResolver`.
// Allow `matches` list for both, using `resolveMatches`

const isValidResult = (_: any) => true;

const functions = {
  invalid: {},
  valid: {
    isValidResult
  }
};

describe('FieldMap', () => {
  const ctx: any = {
    valid: {
      mapName: 'fakes',
      name: 'label',
      functions
    },
    invalid: {}
  };

  const config = {
    resolvers: {
      maps: {
        fakes: {
          resolveResult: () => 1
        }
      }
    },
    maps: {
      fakes: {
        x: 1
      },
      examples: {
        x: 2
      }
    }
  };

  describe('new', () => {
    test('invalid ctx throws', () => {
      expect(() => new KeyMatcher(ctx.invalid, config)).toThrow();
    });

    test('valid ctx does not throw', () => {
      expect(() => new KeyMatcher(ctx.valid, config)).not.toThrow();
    });
  });
});

describe('createKeyMatcher', () => {
  // fieldMap,
  // type,
  // typeName,
  // fieldName,
  // fieldType,
  // field,
  // fields,
  // error,
  // config,
  // functions

  // const type = "Person";
  // const field = {
  //   type: "String",
  //   name: "firstName"
  // };
  const fieldType = 'string';
  const fieldMap = {
    name: {
      matches: ['label', 'caption']
    }
  };

  const typeName = 'Person';
  const fieldName = 'name';
  const ctx: any = {
    fieldName,
    name: fieldName,
    fieldMap,
    fieldType,
    typeName,
    functions: functions.valid
  };
  const keyMatcher = createKeyMatcher(ctx);

  describe('keyMatcher instance', () => {
    test('fieldMap', () => {
      expect(keyMatcher.fieldMap).toBe(fieldMap);
    });

    test('fieldType', () => {
      expect(keyMatcher.fieldType).toBe(fieldType);
    });

    test('functions', () => {
      expect(keyMatcher.functions).toBe(functions.valid);
    });

    test('isValidResult', () => {
      expect(keyMatcher.isValidResult).toBe(isValidResult);
    });
  });

  describe('resolveMatches', () => {
    const key = 'name';
    const obj = {
      string: {
        value: 32
      }
    };
    const matches = keyMatcher.resolveMatches(obj, { key });
    console.log({ matches });
    test('matches', () => {
      expect(matches).toEqual([]);
    });
  });

  describe('resolveObj', () => {
    const value = 32;

    describe('string', () => {
      const obj = {
        string: {
          value
        }
      };
      const valueObj = keyMatcher.resolveObj(obj);
      test('resolves existing key to value', () => {
        expect(valueObj.value).toBe(value);
      });
    });

    describe('String', () => {
      const obj = {
        String: {
          value
        }
      };
      const valueObj = keyMatcher.resolveObj(obj);
      test('resolves existing key to value', () => {
        expect(valueObj.value).toBe(value);
      });
    });

    describe('default', () => {
      const obj = {
        default: {
          value
        }
      };
      const valueObj = keyMatcher.resolveObj(obj);
      test('resolves existing key to value', () => {
        expect(valueObj.value).toBe(value);
      });
    });

    describe('fallback to object', () => {
      const obj = {
        value
      };
      const valueObj = keyMatcher.resolveObj(obj);
      test('resolves existing key to value', () => {
        expect(valueObj.value).toBe(value);
      });
    });
  });

  describe.only('resolve', () => {
    test('resolves existing key to value', () => {
      const resolved = keyMatcher.resolve('label');
      console.log({ resolved });
      expect(resolved).toEqual('name');
    });

    test('resolves unknown key to unknown (default if not match)', () => {
      const resolved = keyMatcher.resolve('unknown');
      expect(resolved).toEqual('unknown');
    });
  });
});
