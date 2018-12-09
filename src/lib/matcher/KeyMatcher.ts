import { EntryMatcher } from './EntryMatcher';

export function createKeyMatcher(ctx: any, config: any = {}) {
  return new KeyMatcher(ctx, config);
}

export function createKeyResolver(
  ctx: any,
  config: any = {}
): (key: string) => string {
  return createKeyMatcher(ctx, config).resolve;
}

export class KeyMatcher extends EntryMatcher {
  ctx: any;
  map: any;
  name: string;
  functions: any;
  opts: any;
  isValidResult: (result: any) => boolean;

  constructor(ctx: any = {}, config = {}) {
    super(ctx, config);
    const { name, functions, map, opts } = ctx;
    if (!functions) {
      this.error('missing functions entry on context');
    }
    this.functions = functions;
    this.opts = opts || {};
    const { isValidResult } = functions;
    if (typeof isValidResult !== 'function') {
      this.error('isValidResult is not a function', {
        isValidResult,
        functions,
        ctx,
        config
      });
    }

    this.isValidResult = isValidResult;

    this.map = map;
    this.name = name;
  }

  // key being iterated on fieldMap
  resolve = key => {
    const { isValidResult, map, name } = this;
    const entryObj = map[key];
    if (!entryObj) {
      this.error('resolve: invalid map key', {
        key,
        entryObj
      });
    }

    const matches = this.resolveMatches(entryObj, name, this.opts);

    this.validateMatches(matches, key, entryObj);

    if (!isValidResult(entryObj)) {
      return false;
    }

    const matched = this.matchResult(entryObj, matches);
    return matched;
  };

  validateMatches(matches, key, obj) {
    return Array.isArray(matches)
      ? true
      : this.error(
          `resolveArray: ${key} missing matches array. Invalid ${matches}`,
          {
            key,
            obj,
            matches,
            ...this.ctx
          }
        );
  }
}