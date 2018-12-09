import { BaseMapResolver } from './BaseMapResolver';
import { resolveFromMap } from './MapResolver';
import { createKeyMatcher, createKeyResolver } from './matcher/KeyMatcher';
import merge from 'merge';

export const createTypeMapResolver = (ctx, config) => {
  return new TypeMapResolver(ctx, config).init();
};

export class TypeMapResolver extends BaseMapResolver {
  fieldMap: any;
  context: any;
  typeFieldMap: any;
  resolveFromMap: (ctx, config?) => any;
  functions: any;
  mapName: string;
  mapResolved: {
    typeMap?: boolean;
    fieldMap?: boolean;
  };

  constructor(ctx: any = {}, config: any = {}) {
    super(ctx, config);
  }

  init(context = {}) {
    this.ctx = merge.recursive(this.ctx, context);

    const { config, ctx } = this;
    const { type, field, name, mapName, map, maps } = ctx;
    const error = config.error;
    const log = config.log || console.log;
    const typeName = typeof type === 'string' ? type : type.name;

    if (!field) {
      this.error('missing field in ctx', ctx);
    }

    const functions = ctx.functions || {};
    const fieldName = field.name;
    const fieldType = field.type;

    const confMap = map || this.mapsDataFor(mapName, maps);
    if (!this.isFullObject(confMap)) {
      this.error('missing map to resolve', {
        mapName,
        maps,
        map
      });
    }

    const typeMap = confMap.typeMap || {};
    const fieldMap = confMap.fieldMap || {};

    if (!(typeMap || fieldMap)) {
      this.error('missing typeMap or fieldMap in map to resolve from', {
        map: confMap
      });
    }

    this.typeFieldMap = typeMap;
    this.fieldMap = fieldMap;

    this.mapName = mapName || config.mapName;
    const resolvers = this.resolversFor(mapName);
    const factories = this.resolversFor(mapName);

    this.resolveFromMap = resolvers.resolveFromMap || resolveFromMap;

    this.functions = {
      ...functions,
      ...this.defaultFactories,
      ...factories,
      ...resolvers
    };
    this.mapResolved = {};

    this.context = {
      mapName,
      functions: this.functions,
      type,
      field,
      name: name || fieldName,
      typeName,
      fieldName,
      fieldType,
      config,
      error,
      log
    };
    return this;
  }

  resolve() {
    let result;
    this.mapResolved = {};
    const resolvedTypeMap = this.resolveTypeMap();
    if (resolvedTypeMap) {
      result = this.resolveFieldMap(resolvedTypeMap);
    }

    result = result || this.resolveFieldMap();
    return result;
  }

  resolveTypeMap() {
    const result = this.resolveMap(this.typeFieldMap, { isType: true });
    if (result) {
      this.mapResolved.typeMap = true;
    }
    return result;
  }

  resolveFieldMap(map = this.fieldMap) {
    const result = this.resolveMap(map);
    if (result) {
      this.mapResolved.fieldMap = true;
    }
    return result;
  }

  get defaultFactories() {
    return {
      createKeyMatcher,
      createKeyResolver
    };
  }

  resolveMap(map, opts = {}) {
    return this.resolveFromMap(
      {
        opts,
        map,
        ...this.context
      },
      this.config
    );
  }
}
