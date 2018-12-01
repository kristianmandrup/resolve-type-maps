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

    describe('findMatch', () => {
      const matches = ['label', 'caption'];
      const matched = entryMatcher.findMatch(matches);

      test('item matched', () => {
        expect(matched).toBeDefined();
      });
    });
  });
});
