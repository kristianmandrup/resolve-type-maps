import { MapResolver } from './MapResolver';

// re-align `typeFieldMap` and `fieldMap` (resolve examples and fakes), using a generic `resultResolver`.
// Allow `matches` list for both, using `resolveMatches`
describe('MapResolver', () => {
  const type = 'Person';
  const name = 'firstName';
  const field = {
    type: 'String',
    name
  };
  const config = {
    maps: {
      fakes: {
        fieldMap: {
          word: ['firstName']
        }
      }
    }
  };

  const resolver = new MapResolver('fakes', { type, field, name }, config);
  console.log({ resolver });
  describe('instance', () => {
    test('is defined', () => {
      expect(resolver).toBeDefined();
    });

    describe('fieldMap', () => {
      const { fieldMap } = resolver;
      test('is defined', () => {
        expect(fieldMap).toBeDefined();
      });
    });

    describe('typeMap', () => {
      const { typeFieldMap } = resolver;
      test('is not defined', () => {
        expect(typeFieldMap).not.toBeDefined();
      });
    });

    describe('context', () => {
      const { context } = resolver;
      test('is defined', () => {
        expect(context).toBeDefined();
      });
    });

    describe('resolveMap', () => {
      const map = {};
      const resolved = resolver.resolveMap(map);
      test('resolved: is defined', () => {
        expect(resolved).toBeDefined();
      });
    });
  });
});
