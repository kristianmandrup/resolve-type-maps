import * as maps from '../maps';
import { TypeMapResolver } from '../../src/lib/TypeMapResolver';

export const isValidResult = Array.isArray;

export const resolveResult = obj => {
  if (Array.isArray(obj)) return obj;
  if (obj.values) return obj.values;
};

export class ExamplesMapResolver extends TypeMapResolver {
  constructor(ctx = {}, config = {}) {
    super(ctx, config);
    this.functions = {
      ...this.functions,
      isValidResult,
      resolveResult
    };
  }
}
