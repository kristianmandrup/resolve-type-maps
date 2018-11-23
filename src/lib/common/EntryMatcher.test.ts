import { EntryMatcher } from './EntryMatcher';
import { fakes, examples } from '../maps';

const resolveResult = obj => obj;

describe('EntryMatcher', () => {
  const ctx: any = {
    valid: {
      name: 'label',
      functions: {
        resolveResult,
        createKeyMatcher: () => ({})
      }
    },
    noFunctions: {
      name: 'label'
    },
    empty: {}
  };

  const config = {
    maps: {
      fakes,
      examples
    }
  };

  const matches = ['label', 'caption'];

  describe('new', () => {
    // let sub classes take care of assigning default functions as needed
    test('no functions: ok', () => {
      expect(() => new EntryMatcher(ctx.noFunctions, config)).not.toThrow();
    });

    test('valid ctx does not throw', () => {
      expect(() => new EntryMatcher(ctx.valid, config)).not.toThrow();
    });
  });

  describe('instance', () => {
    const entryMatcher = new EntryMatcher(ctx.valid, config);
    test('defined', () => {
      expect(entryMatcher).toBeDefined();
    });

    describe('prepareRegExp', () => {
      test('basic string', () => {
        const regExp = entryMatcher.prepareRegExp('he');
        expect(regExp.test('hello')).toBeTruthy();
      });

      test('empty string', () => {
        const regExp = entryMatcher.prepareRegExp('');
        expect(regExp.test('hello')).toBeTruthy();
      });

      test('string with special RegExp symbols', () => {
        const regExp = entryMatcher.prepareRegExp('h\\w+');
        expect(regExp.test('hello')).toBeTruthy();
      });

      test('RegExp', () => {
        const regExp = entryMatcher.prepareRegExp(/h\w+/);
        expect(regExp.test('hello')).toBeTruthy();
      });
    });

    describe('resolveMatches', () => {
      const obj = {
        x: 32
      };

      describe('matching key', () => {
        const key = 'x';
        const resolved = entryMatcher.resolveMatches(obj, { key });
        test('resolved', () => {
          expect(resolved).toBeDefined();
        });
      });

      describe('not matching key', () => {
        const key = 'unknown';
        const notResolved = entryMatcher.resolveMatches(obj, { key });
        test('resolved', () => {
          expect(notResolved).toEqual(['unknown']);
        });
      });
    });

    describe('matchResult', () => {
      const obj = {
        label: {
          value: 2
        }
      };

      describe('missing name', () => {
        const entryMatcher = new EntryMatcher(ctx.empty, config);
        test('throws', () => {
          expect(() => entryMatcher.matchResult(obj, matches)).toThrow();
        });
      });

      const result = entryMatcher.matchResult(obj, matches);
      test('result matched', () => {
        expect(result).toBeDefined();
      });
    });

    describe('matchName', () => {
      const matchItem = {};
      const matched = entryMatcher.findMatch(matchItem);

      test('item matched', () => {
        expect(matched).toBeDefined();
      });
    });
  });
});
