import * as maps from '../maps';
import { MapResolver } from '../MapResolver';

export const isValidResult = Array.isArray;

export const resolveResult = obj => {
  if (Array.isArray(obj)) return obj;
  if (obj.values) return obj.values;
};

export class ExamplesMapResolver extends MapResolver {
  constructor(ctx = {}, config = {}) {
    super('examples', ctx, {
      maps,
      ...config
    });
    this.functions = {
      ...this.functions,
      isValidResult,
      resolveResult
    };
  }
}
