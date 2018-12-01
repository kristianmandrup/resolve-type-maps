import { Base } from '../Base';

export function resolveFromFieldMap(ctx, config?) {
  return new FieldMap(ctx, config).resolve();
}

export class FieldMap extends Base {
  // functions,
  // type,
  // typeName,
  // field,
  // fieldName,
  // fieldType,
  // fields,
  // config,
  // error,
  // log
  fieldMap: any;
  ctx: any;
  createKeyMatcher: (ctx: any) => (ctx: any) => string | null;
  matchKey: (key: string) => any;

  constructor(ctx: any, config = {}) {
    super(config);
    this.ctx = ctx;
    const { fieldMap, functions } = ctx;
    if (!functions) {
      this.error('missing functions entry on context');
    }
    if (!fieldMap) {
      this.error('missing fieldMap');
    }
    const { createKeyMatcher } = functions;
    if (typeof createKeyMatcher !== 'function') {
      this.error('Invalid createKeyMatcher. Must be a function', {
        createKeyMatcher,
        functions,
        ctx
      });
    }
    this.createKeyMatcher = createKeyMatcher;

    const matchKey = this.createKeyMatcher(this.ctx);
    if (typeof matchKey !== 'function') {
      this.error('Invalid matchKey. Must be a function', {
        matchKey,
        ctx
      });
    }

    this.fieldMap = fieldMap;

    this.matchKey = matchKey;
  }

  resolve() {
    this.validateFunction({
      method: 'resolve',
      data: {
        config: this.config
      },
      func: this.createKeyMatcher,
      functionName: 'createKeyMatcher',
      error: this.error
    });

    const keys = Object.keys(this.fieldMap);
    if (keys.length === 0) {
      this.warn('no keys in fieldMap', {
        fieldMap: this.fieldMap
      });
    }
    let result;
    const key = keys.find(key => {
      result = this.matchKey(key);
      return Boolean(result);
    });
    return key ? result : null;
  }
}
