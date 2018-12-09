import { Base } from './Base';

export function resolveFromMap(ctx, config?) {
  const resolver = createMapResolver(ctx, config);
  return resolver.resolve();
}

export function createMapResolver(ctx, config?) {
  return new MapResolver(ctx, config);
}

type CreateKeyMatcherFn = (
  ctx: any,
  config: any
) => {
  resolve: (key: string, value?: any) => string | null;
};

type CreateKeyResolverFn = (
  ctx: any,
  config: any
) => (key: string) => string | null;
type ResolveKeyFn = (key: string, value?: any) => any;

export class MapResolver extends Base {
  map: any;
  name: string;
  ctx: any;
  createKeyMatcher?: CreateKeyMatcherFn;
  createKeyResolver?: CreateKeyResolverFn;
  resolveKey: ResolveKeyFn;

  constructor(ctx: any, config = {}) {
    super(config);
    this.ctx = ctx;
    this.name = ctx.name;
    const { map, functions } = ctx;
    if (!functions) {
      this.error('missing functions entry on context');
    }
    if (!this.isObject(map)) {
      this.error('missing map');
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

    this.map = map;
    this.resolveKey = resolveKey;
  }

  resolve() {
    const { map } = this;
    if (!this.isFullObject(map)) {
      this.warn('no keys in map', {
        map
      });
      return null;
    }
    const keys = Object.keys(map);
    // console.log('resolve', { keys, name: this.name, map });
    let result;
    for (const key of keys) {
      result = this.resolveKey(key, map[key]);
      if (result) break;
    }
    return result;
  }
}
