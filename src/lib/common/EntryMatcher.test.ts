import { EntryMatcher } from './EntryMatcher';
import { fakes, examples } from '../maps';

describe('EntryMatcher', () => {
  const ctx: any = {
    valid: {
      functions: {
        createKeyMatcher: () => ({})
      }
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
      fakes,
      examples
    }
  };

  const matches = ['label', 'caption'];

  describe('new', () => {
    test('invalid ctx throws', () => {
      expect(() => new EntryMatcher(ctx.invalid, config)).toThrow();
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
          expect(notResolved).toBeFalsy();
        });
      });
    });

    describe('matchResult', () => {
      const obj = {};
      const result = entryMatcher.matchResult(obj, matches);

      test('result matched', () => {
        expect(result).toBeDefined();
      });
    });

    describe('matchName', () => {
      const matchItem = {};
      const matched = entryMatcher.matchName(matchItem);

      test('item matched', () => {
        expect(matched).toBeDefined();
      });
    });
  });
});
