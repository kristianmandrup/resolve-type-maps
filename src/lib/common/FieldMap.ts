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
  createKeyMatcher: (
    ctx: any,
    config: any
  ) => {
    resolve: (key: string) => string | null;
  };
  createKeyResolver: (ctx: any, config: any) => (key: string) => string | null;
  resolveKey: (key: string) => any;

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
    const { createKeyResolver, createKeyMatcher } = functions;
    if (typeof createKeyResolver !== 'function') {
      this.error('Invalid createKeyResolver. Must be a function', {
        createKeyResolver,
        functions,
        ctx
      });
    }
    const resolveKey = createKeyResolver
      ? createKeyResolver(this.ctx, this.config)
      : createKeyMatcher(ctx, config).resolve;
    if (typeof resolveKey !== 'function') {
      this.error('Invalid resolveKey. Must be a function', {
        resolveKey,
        ctx
      });
    }

    this.fieldMap = fieldMap;
    this.resolveKey = resolveKey;
  }

  resolve() {
    // this.validateFunction({
    //   method: 'resolve',
    //   data: {
    //     config: this.config
    //   },
    //   func: this.createKeyMatcher,
    //   functionName: 'createKeyMatcher',
    //   error: this.error
    // });

    const keys = Object.keys(this.fieldMap);
    if (keys.length === 0) {
      this.warn('no keys in fieldMap', {
        fieldMap: this.fieldMap
      });
      return null;
    }
    let result;
    const key = keys.find(key => {
      result = this.resolveKey(key);
      return Boolean(result);
    });
    return key ? result : null;
  }
}
