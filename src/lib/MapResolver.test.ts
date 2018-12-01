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
  const fieldMap = {
    word: ['firstName']
  };
  const typeMap = {
    Person: {
      name: 'firstName'
    }
  };

  const config = {
    maps: {
      fakes: {
        fieldMap,
        typeMap
      }
    }
  };

  const resolver = new MapResolver('fakes', { type, field, name }, config);
  console.log({ resolver });
  describe('instance', () => {
    test('is defined', () => {
      expect(resolver).toBeDefined();
    });

    describe.only('fieldMap', () => {
      const { fieldMap } = resolver;
      test('is the fieldMap of maps', () => {
        expect(fieldMap).toBe(fieldMap);
      });
    });

    describe.only('typeMap', () => {
      const { typeFieldMap } = resolver;
      test('is the typeMap of maps', () => {
        expect(typeFieldMap).toBe(typeMap);
      });
    });

    describe('context', () => {
      const { context } = resolver;
      test('is defined', () => {
        expect(context).toBeDefined();
      });
    });

    describe('resolveMap', () => {
      // todo: what map?
      const map = {};
      const resolved = resolver.resolveMap(map);
      test('resolved: is defined', () => {
        expect(resolved).toBeDefined();
      });
    });

    describe('resolve', () => {
      // check FieldMap in common
      const resolved = resolver.resolve();
      test('resolved: is defined', () => {
        expect(resolved).toBeDefined();
      });
    });
  });
});
