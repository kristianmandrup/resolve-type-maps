import { resolveExamples } from '.';

// re-align `typeFieldMap` and `fieldMap` (resolve examples and fakes), using a generic `resultResolver`.
// Allow `matches` list for both, using `resolveMatches`

describe('resolveExample', () => {
  const name = 'firstName';
  const field = {
    name,
    type: 'String'
  };
  const type = 'Person';
  const example = resolveExamples({ field, name, type });

  describe('example', () => {
    test('is defined', () => {
      expect(example).toBeDefined();
    });
  });
});

import { resolveResult, ExamplesMapResolver } from './ExamplesMapResolver';

describe('ExampleResolver', () => {
  const field = {
    name: 'firstName',
    type: 'String'
  };
  const type = 'Person';
  const resolver = new ExamplesMapResolver({ field, type });

  describe('resolver', () => {
    test('is defined', () => {
      expect(resolver).toBeDefined();
    });
  });
});

describe('resolveResult', () => {
  const values = ['x', 'y'];
  const obj = {
    values: ['x', 'y']
  };
  const resolved = resolveResult(obj);
  console.log('resolveResult', { values });

  describe('resolved', () => {
    test('is values', () => {
      expect(resolved).toEqual(values);
    });
  });
});
