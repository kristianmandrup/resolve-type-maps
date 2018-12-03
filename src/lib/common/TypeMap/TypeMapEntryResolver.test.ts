import { TypeMapEntryResolver } from './TypeMapEntryResolver';

describe('TypeMap', () => {
  const typeMap = {
    Car: {},
    Person: {
      matches: ['User'],
      fields: {
        name: {
          type: 'string'
        }
      }
    }
  };

  const ctx = {
    mapName: 'fakes',
    typeMap,
    typeName: 'Person',
    name: 'label',
    functions: {
      resolveResult: () => 1
    }
  };
  const resolver = new TypeMapEntryResolver(ctx);

  describe('instance', () => {
    test('defined', () => {
      expect(resolver).toBeDefined();
    });

    describe('resolve: key match', () => {
      const resolved = resolver.resolve('Person');

      test('resolved', () => {
        expect(resolved).toBeDefined();
      });
    });

    describe.only('resolve: matches', () => {
      const resolved = resolver.resolve('User');
      // console.log({ resolved });

      test('resolved', () => {
        expect(resolved).toBeDefined();
      });
    });

    describe('resolve: no match', () => {
      const noHit = resolver.resolve('Unknown');

      test('not resolved', () => {
        expect(noHit).not.toBeDefined();
      });
    });
  });
});
