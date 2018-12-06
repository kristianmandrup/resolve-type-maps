import { TypeMap } from './TypeMap';

describe('TypeMap', () => {
  const ctx: any = {
    name: 'label',
    functions: {
      resolveResult: value => value
    }
  };
  const config = {
    maps: {
      fakes: {
        data: {
          typeMap: {
            Person: {
              name: 'firstName'
            }
          },
          fieldMap: {
            name: 'lastName'
          }
        }
      },
      examples: {
        data: {
          fieldMap: {
            name: ['John', 'Sally']
          }
        }
      }
    }
  };

  const typeMap = new TypeMap(ctx, config);

  describe('instance', () => {
    test('defined', () => {
      expect(typeMap).toBeDefined();
    });

    describe('resolveInMap', () => {
      const typeNamesInMap = ['Person'];
      const resolver = {
        resolve: _ => ({
          value: 'ok'
        })
      };
      const result = typeMap.resolveInMap(typeNamesInMap, resolver);

      test('value is ok', () => {
        expect(result).toEqual({ value: 'ok' });
      });
    });

    describe('resolve', () => {
      const maps: any = config.maps.fakes.data;
      const resolved = typeMap.resolve(maps.typeMap, 'Person');
      // console.log({ resolved });

      test('resolved', () => {
        expect(resolved).toEqual({ name: 'firstName' });
      });
    });
  });
});
