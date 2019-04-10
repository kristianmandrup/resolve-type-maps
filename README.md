# resolve-type-maps

Resolve type maps for use when building and resolving type models.

## When to use

Resolving type/field to a value is extremely useful in many model driven development scenarios.
This can be used to assign default configurations for:

- Entity model types
- model validations
- form fields
- form field validations
- faking/mocking entities and fields
- ...

See the [json-schema-to-es-mapping](https://github.com/kristianmandrup/json-schema-to-es-mapping#resolve-type-maps) for an example where this library (and its features) can be used effectively.

You could even generate models and schemas directly from data, such as JSON data.

```js
{
  persons: [
    {
      id: 'person:1',
      name: 'John',
      age: 32,
      status: 'single'
    },
    {
      id: 'person:2',
      name: 'Anna',
      age: 26,
      status: 'married'
    }
  ];
}
```

By resolving this data against some pre-defined type maps...
We could resolve the data to a type schema:

```js
const types = {
  Person: {
    fields: {
      id: {
        type: 'ID',
        generated: true,
        primary: true
      },
      name: {
        type: 'string',
        constraint: { alpha: true }
      },
      age: {
        type: 'int',
        constraint: { range: { min: 0, max: 100 } }
      },
      status: {
        type: 'enum',
        values: ['single', 'married']
      }
    }
  }
};
```

We can then reuse these maps across project or share with others, building up a repository of pre-defined mappings ready to be used on domain specific projects.

These mappings could serve as useful defaults, to be overridden as needed on a case by case basis, but serving as a quick way to set up the initial models and schemas for the project.

## Usage

Define resolvers to validate and resolve entry:

```js
// resolvers.js

export const isValidResult = value => {
  if (!value) return false;
  const testVal = value.faker || value;
  return Boolean(typeof testVal === 'string');
};

// check if object and has any keys
export const isValidTypeEntry = obj =>
  obj === Object(obj) && Object.keys(obj).length > 0;

// todo: perhaps rename to resolveFieldMapEntry or resolveLeaf
export const resolveResult = ({ value, key = value }: any = {}) => {
  const $default = { faker: key, options: {} };
  if (value.faker) {
    return { faker: value.faker, options: value.options || {} };
  }
  return $default;
};

//  used to resolve a matching type map entry
//  can be resolved recursively until a fieldMap is reached where resolveResult is used.
//  rename to resolveNode to make more generic perhaps

export const resolveTypeEntry = ({ value }: any = {}) => value;
```

Using resolver functions with `createTypeMapResolver`

```js
import {
  createTypeMapResolver,
  // TypeMapResolver,
  // createMapResolver,
  // MapResolver,
  // BaseMapResolver,
  // Base
} from 'resolve-type-maps';

import * as functions from './resolvers'

// see maps examples below
const fieldMap: {
  price: {
    matches: ['money', 'price', 'amount', 'value'],
    faker: "money",
    options: {
      minMoney: 10,
      maxMoney: 1000,
      decimalPlaces: 2
    }
  },
  // ...
}

const resolver = createTypeMapResolver(
  { map: fieldMap, functions, name: 'value' },
  config
);
const { faker, options } = resolver.resolve()
```

## Advanced example

```js
import { TypeMapResolver } from 'resolve-type-maps';
import * as maps from '../maps';

export class FakesMapResolver extends TypeMapResolver {
  constructor(ctx = {}, config = {}) {
    super(ctx, config);
    this.init({
      mapName: 'fakes', // which map to use
      maps, // contains maps for both fakes and examples
      functions: {
        resolveResult,
        isValidResult
      }
    });
  }
}

export const resolveFakes = (ctx, config): FakerResult => {
  return new FakesMapResolver(ctx, config).resolve();
};

const config = {
  maps: {
    // will use mapName to lookup map.fakes
    fakes: {
      // will use .typeMap (by default). Will attempt to resolve first if present
      typeMap: {
        Person: {
          // will use isValidTypeEntry to check if this is a valid entry
          // if valid use resolveTypeEntry to resolve this object to use as fieldMap
          matches: ['User', 'Person'],
          // might want to further nest the fieldMap with key, such as having matches and data (ie. meta level)
          name: {
            // will use resolveResult to resolve values to be returned
            // will use isValidResult to check if this is a valid entry
            matches: [/name$/],
            faker: 'fullName'
          }
        }
      },
      // will use .fieldMap (by default). Will attempt to use to resolve if not resolved via typeMap
      fieldMap: {
        name: {
          // will use isValidResult to check if this is a valid entry
          // if valid use resolveResult to resolve object to return
          // might want to further nest the data, such as having matches and data, ie. meta level,
          // depending on complexity or to have a standard navigation/resolution mechanism
          matches: ['name'],
          faker: 'firstName'
        },
        caption: {
          matches: ['title', 'label', 'captio'],
          faker: 'word'
        },
        description: 'lorem'
      }
    }
  }
};

const field = {
  type: 'String',
  name: 'name'
};

const nameFaker = resolveFakes({ type: 'Person', field }, config);
// => fullName

const titleFaker = resolveFakes({ type: 'Person', name: 'title' }, config);
// => word

const descFaker = resolveFakes({ type: 'Person', name: 'description' }, config);
// => lorem
```

## Examples

See [Faker maps](./FakerMaps.md) for more map examples.

## License

MIT
