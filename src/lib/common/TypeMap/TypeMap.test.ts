import { TypeMap } from './TypeMap';

describe('TypeMap', () => {
  const ctx: any = {
    name: 'label',
    functions: {
      resolveResult: () => 1
    }
  };
  const config = {
    maps: {
      fakes: {
        data: {
          x: 1
        }
      },
      examples: {
        data: {
          x: 2
        }
      }
    }
  };

  const typeMap = new TypeMap(ctx, config);

  describe('instance', () => {
    test('defined', () => {
      expect(typeMap).toBeDefined();
    });

    describe('resolve', () => {
      const maps: any = config.maps.fakes;
      const resolved = typeMap.resolve(maps.typeMap, 'Person');

      test('resolved', () => {
        expect(resolved).toBeDefined();
      });
    });
  });
});
