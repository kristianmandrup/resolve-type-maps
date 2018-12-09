import * as maps from '../maps';
import { TypeMapResolver } from '../../src/lib/TypeMapResolver';

export const isValidResult = value => {
  if (!value) return false;
  const testVal = value.faker || value;
  return Boolean(typeof testVal === 'string');
};

export const resolveResult = ({ value, key = value }: any = {}) => {
  const $default = { faker: key, options: {} };
  if (value.faker) {
    return { faker: value.faker, options: value.options || {} };
  }
  return $default;
};

export class FakesMapResolver extends TypeMapResolver {
  constructor(ctx = {}, config = {}) {
    super(ctx, {
      mapName: 'fakes',
      maps,
      ...config
    });
    this.functions = {
      ...this.functions,
      resolveResult,
      isValidResult
    };
  }
}
