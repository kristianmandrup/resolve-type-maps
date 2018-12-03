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

  resolve = key => {
    const { isValidResult, fieldMap } = this;
    let matches;
    let obj = fieldMap[key];
    obj = this.resolveObj(obj);
    if (!isValidResult(obj)) {
      return false;
    }

    matches = matches || this.resolveMatches(obj, { key });
    this.validateMatches(matches, key, obj);

    return this.matchResult(obj, matches);
  };

  resolveMatches(obj, { key }) {
    if (typeof obj === 'string') {
      return [obj];
    }
    return obj.match || obj.matches || [key];
  }

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
