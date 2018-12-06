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

const lower = (str: string) => str.toLowerCase();

const capitalize = (str: string) => str.replace(/^\w/, c => c.toUpperCase());

export class KeyMatcher extends EntryMatcher {
  ctx: any;
  fieldMap: any;
  fieldType: string;
  typeName: string;
  functions: any;
  isValidResult: (result: any) => boolean;

  constructor(ctx: any = {}, config = {}) {
    super(ctx, config);
    const { fieldMap, fieldType, typeName, functions } = ctx;
    if (!functions) {
      this.error('missing functions entry on context');
    }
    this.functions = functions;
    // TODO: extract directly from ctx
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

    this.fieldMap = fieldMap;
    this.fieldType = fieldType;
    this.typeName = typeName;
  }

  resolveObj(obj: any = {}) {
    const { fieldType } = this;
    // allow more fine grained mapping on type of field
    const typeClass = capitalize(fieldType);
    const typeName = lower(fieldType);

    return (
      obj[fieldType] ||
      obj[typeName] ||
      obj[typeClass] ||
      obj.default ||
      obj.any ||
      obj
    );
  }

  // key being iterated on fieldMap
  resolve = key => {
    const { isValidResult, fieldMap, name } = this;
    const fieldObj = fieldMap[key];
    if (!fieldObj) {
      this.error('resolve: invalid fieldMap key', {
        key,
        fieldMap
      });
    }
    const resolvedObj = this.resolveObj(fieldObj);
    if (!isValidResult(resolvedObj)) {
      return false;
    }

    const matches = this.resolveMatches(resolvedObj, name);

    this.validateMatches(matches, key, resolvedObj);

    const matched = this.matchResult(resolvedObj, matches);
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
