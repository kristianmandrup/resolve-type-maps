import { createKeyMatcher, KeyMatcher } from './KeyMatcher';

// re-align `typeFieldMap` and `fieldMap` (resolve examples and fakes), using a generic `resultResolver`.
// Allow `matches` list for both, using `resolveMatches`

const isValidResult = (_: any) => true;
const resolveResult = obj => obj.data || obj;

const functions = {
  invalid: {},
  valid: {
    isValidResult,
    resolveResult
  }
};

describe('FieldMap', () => {
  const ctx: any = {
    valid: {
      mapName: 'fakes',
      name: 'label',
      functions: functions.valid
    },
    invalid: {}
  };

  const config = {
    maps: {
      fakes: {
        data: {
          x: 1
        }
      },
      examples: {
        data: {
          x: 2
        }
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
      matches: ['label', 'caption'],
      data: {
        value: 32
      }
    }
  };

  const typeName = 'Person';
  const fieldName = 'name';
  const ctx: any = {
    mapName: 'fakes',
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
    const obj = {
      string: {
        value: 32
      }
    };

    test('invalid key', () => {
      expect(() => keyMatcher.resolveMatches(obj, null)).toThrow();
    });

    describe('obj is string', () => {
      const obj = 'lastName';
      const key = 'name';
      const matches = keyMatcher.resolveMatches(obj, key);
      test('list with obj string entry', () => {
        expect(matches).toEqual([obj]);
      });
    });

    describe('obj has matches entry', () => {
      const key = 'name';
      const matches = ['label'];
      const obj = {
        matches,
        string: {
          value: 32
        }
      };

      const list = keyMatcher.resolveMatches(obj, key);
      test('obj matches entry', () => {
        expect(list).toEqual(matches);
      });
    });

    describe('obj has match entry with string', () => {
      const key = 'name';
      const match = 'label';
      const obj = {
        match,
        string: {
          value: 32
        }
      };

      const list = keyMatcher.resolveMatches(obj, key);
      test('obj matches entry', () => {
        expect(list).toEqual([match]);
      });
    });
  });

  describe('validateMatches', () => {
    const key = 'name';
    const obj = {
      string: {
        value: 32
      }
    };
    const matches = ['name', 'label'];

    const validated = keyMatcher.validateMatches(matches, key, obj);
    // console.log({ matches });
    test('validated', () => {
      expect(validated).toBeTruthy();
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
      test('resolves default key to value', () => {
        expect(valueObj.value).toEqual(32);
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

  describe('resolve', () => {
    test('resolves existing key to value', () => {
      const name = 'label';
      keyMatcher.name = name;
      keyMatcher.ctx.name = name;
      const resolved = keyMatcher.resolve('name');
      expect(resolved).toEqual({ value: 32 });
    });

    test('resolves unknown key to unknown (default if not match)', () => {
      const name = 'unknown';
      keyMatcher.name = name;
      keyMatcher.ctx.name = name;
      const resolved = keyMatcher.resolve('name');
      expect(resolved).toBe(null);
    });
  });
});
