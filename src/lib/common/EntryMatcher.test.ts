import { EntryMatcher } from './EntryMatcher';
import { fakes, examples } from '../maps';

const resolveResult = obj => obj;

describe('EntryMatcher', () => {
  const ctx: any = {
    valid: {
      mapName: 'fakes',
      name: 'label',
      functions: {
        createKeyMatcher: () => ({}),
        resolveResult
      }
    },
    noFunctions: {
      name: 'label'
    },
    empty: {}
  };

  const config = {
    maps: {
      fakes: {
        data: fakes
      },
      examples: {
        data: examples
      }
    }
  };

  const matches = ['label', 'caption'];

  describe('new', () => {
    // let sub classes take care of assigning default functions as needed
    test('no functions: ok', () => {
      expect(() => new EntryMatcher(ctx.noFunctions, config)).toThrow();
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
        const resolved = entryMatcher.resolveMatches(obj, key);
        test('resolved', () => {
          expect(resolved).toEqual([key]);
        });
      });

      describe('not matching key', () => {
        const key = 'unknown';
        const notResolved = entryMatcher.resolveMatches(obj, key);
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
      const result = entryMatcher.matchResult(obj, matches);
      // console.log({ result });
      test('result matched', () => {
        expect(result).toEqual(obj);
      });
    });

    describe('findMatch', () => {
      const matches = ['label', 'caption'];
      const matched = entryMatcher.findMatch(matches);

      test('matches one', () => {
        expect(matched).toBeTruthy();
      });
    });

    describe('createItemMatcher', () => {
      const itemMatcher = entryMatcher.createItemMatcher('label');
      const matched = itemMatcher.match();

      test('matches', () => {
        expect(matched).toBeTruthy();
      });
    });
  });
});
