import { ItemMatcher } from './ItemMatcher';

describe('ItemMatcher', () => {
  const itemMatcher = new ItemMatcher({ matchItem: 'Person', name: 'Person' });
  describe('prepareRegExp', () => {
    test('basic string', () => {
      const regExp = itemMatcher.prepareRegExp('he');
      expect(regExp.test('hello')).toBeTruthy();
    });

    test('empty string', () => {
      expect(() => itemMatcher.prepareRegExp('')).toThrow();
    });

    test('string with special RegExp symbols', () => {
      const regExp = itemMatcher.prepareRegExp('h\\w+');
      expect(regExp.test('hello')).toBeTruthy();
    });

    test('RegExp', () => {
      const regExp = itemMatcher.prepareRegExp(/h\w+/);
      expect(regExp.test('hello')).toBeTruthy();
    });
  });

  describe('match/resolveMatchItem', () => {
    const matched = itemMatcher.resolveMatchItem();
    test('matches', () => {
      expect(matched).toBeTruthy();
    });
  });

  describe('resolveMatchFn', () => {
    itemMatcher.matchItem = () => true;
    const matched = itemMatcher.resolveMatchFn();
    test('matches', () => {
      expect(matched).toBeTruthy();
    });
  });
  describe('resolveStringOrRegExp', () => {
    itemMatcher.matchItem = 'Person';
    const matched = itemMatcher.resolveStringOrRegExp();
    test('matches', () => {
      expect(matched).toBeTruthy();
    });
  });
});
