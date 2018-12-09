import { createTypeMapResolver } from './TypeMapResolver';

// re-align `typeFieldMap` and `fieldMap` (resolve examples and fakes), using a generic `resultResolver`.
// Allow `matches` list for both, using `resolveMatches`
describe('TypeMapResolver', () => {
  const type = 'Person';
  const name = 'name';
  const field = {
    type: 'String',
    name
  };
  const fieldMap = {
    description: ['lorem'],
    name: ['firstName']
  };

  const personFieldMap = {
    name: 'firstName'
  };

  const typeMap = {
    Person: personFieldMap
  };

  const resolvers = {
    resolveResult: val => {
      return Array.isArray(val) ? val : val.values;
    },
    isValidResult: () => true
  };
  const functions = resolvers;

  const config = {
    maps: {
      fakes: {
        data: {
          fieldMap,
          typeMap
        },
        resolvers
      }
    }
  };

  const resolver = createTypeMapResolver(
    { mapName: 'fakes', type, field, functions, name },
    config
  );
  // console.log({ resolver });
  describe.only('instance', () => {
    test('is defined', () => {
      expect(resolver).toBeDefined();
    });

    describe('fieldMap', () => {
      const { fieldMap } = resolver;
      test('is the fieldMap', () => {
        expect(fieldMap).toBe(fieldMap);
      });
    });

    describe('typeMap', () => {
      const { typeFieldMap } = resolver;
      test('is the Person typeMap', () => {
        expect(typeFieldMap).toBe(typeMap);
      });
    });

    describe('context', () => {
      const { context } = resolver;
      test('is defined', () => {
        expect(context).toBeDefined();
      });
    });

    describe('resolveFieldMap', () => {
      const resolved = resolver.resolveFieldMap();
      const { mapResolved } = resolver;
      // console.log('FieldMap', { resolved, mapResolved });
      test('resolved: is [lorem]', () => {
        expect(resolved).toEqual(['lorem']);
      });

      test('mapResolved is fieldMap', () => {
        expect(mapResolved.fieldMap).toBeTruthy();
      });
    });

    describe('resolveTypeMap', () => {
      const resolved = resolver.resolveTypeMap();
      const { mapResolved } = resolver;

      test('resolved: is null', () => {
        expect(resolved).toBeFalsy();
      });

      test('mapResolved has fieldMap', () => {
        expect(mapResolved.typeMap).toBeFalsy();
      });
    });

    describe('resolveMap', () => {
      const values = ['john', 'jack'];
      const nameEntry = {
        matches: [/title/, 'label', /name/],
        values
      };
      const map = {
        name: nameEntry
      };
      const resolved = resolver.resolveMap(map);
      const { mapResolved } = resolver;
      // console.log({ resolved, mapResolved });
      test('resolved: is [john, jack]', () => {
        expect(resolved).toEqual(['john', 'jack']);
      });

      test('mapResolved has fieldMap', () => {
        expect(mapResolved.fieldMap).toBeTruthy();
      });
    });

    describe('resolve', () => {
      // check FieldMap in common
      const resolved = resolver.resolve();
      const { mapResolved } = resolver;
      test('resolved: is [lorem]', () => {
        expect(resolved).toEqual(['lorem']);
      });

      test('mapResolved has fieldMap', () => {
        expect(mapResolved.fieldMap).toBeTruthy();
      });
    });
  });
});
