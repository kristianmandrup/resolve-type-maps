import { BaseMapResolver } from './BaseMapResolver';

// re-align `typeFieldMap` and `fieldMap` (resolve examples and fakes), using a generic `resultResolver`.
// Allow `matches` list for both, using `resolveMatches`
describe('BaseMapResolver', () => {
  const ctx: any = {};
  const resMaps = {
    fakes: {
      resolveResult: () => 1
    }
  };
  const maps = {
    fakes: {
      x: 1
    },
    examples: {
      x: 2
    }
  };

  const config = {
    resolvers: {
      maps: resMaps
    },
    factories: {
      maps: {
        fakes: {
          createKeyMatcher: () => 1
        }
      }
    },
    maps
  };
  const resolver = new BaseMapResolver(ctx, config);

  describe('resolversMap', () => {
    const { resolversMap } = resolver;
    test('is defined', () => {
      expect(resolversMap).toBe(resMaps);
    });
  });

  describe('mapsFor', () => {
    const fakes = resolver.mapsFor('fakes');
    test('fakes', () => {
      expect(fakes.x).toBe(1);
    });
  });

  describe('resolversFor', () => {
    const resolvers = resolver.resolversFor('fakes');
    test('resolvers', () => {
      expect(typeof resolvers.resolveResult).toEqual('function');
    });
  });

  describe('factoriesFor', () => {
    const factories = resolver.factoriesFor('fakes');
    test('factories', () => {
      expect(typeof factories.createKeyMatcher).toEqual('function');
    });
  });
});
