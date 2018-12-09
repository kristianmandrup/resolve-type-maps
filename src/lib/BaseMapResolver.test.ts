import { BaseMapResolver } from './BaseMapResolver';

// re-align `typeFieldMap` and `fieldMap` (resolve examples and fakes), using a generic `resultResolver`.
// Allow `matches` list for both, using `resolveMatches`
describe('BaseMapResolver', () => {
  const ctx: any = {};
  const resolvers = {
    resolveResult: () => 1
  };
  const factories = {
    createKeyMatcher: () => 1
  };
  const maps = {
    fakes: {
      data: {
        x: 1
      },
      resolvers,
      factories
    },
    examples: {
      data: {
        x: 2
      }
    }
  };

  const config = {
    maps
  };
  const resolver = new BaseMapResolver(ctx, config);

  describe('mapsFor', () => {
    const fakes = resolver.mapsFor('fakes');
    const { data } = fakes;
    test('fakes data', () => {
      expect(data.x).toBe(1);
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
