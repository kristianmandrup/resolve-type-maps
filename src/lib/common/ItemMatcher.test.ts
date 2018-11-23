import { ItemMatcher } from './ItemMatcher';

describe('ItemMatcher', () => {
  const itemMatcher = new ItemMatcher({ matchItem: 'Person', name: 'Person' });
  describe('prepareRegExp', () => {
    test('basic string', () => {
      const regExp = itemMatcher.prepareRegExp('he');
      expect(regExp.test('hello')).toBeTruthy();
    });

    test('empty string', () => {
      const regExp = itemMatcher.prepareRegExp('');
      expect(regExp.test('hello')).toBeTruthy();
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
});
