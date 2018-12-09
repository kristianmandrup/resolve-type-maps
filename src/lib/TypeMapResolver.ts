import { BaseMapResolver } from './BaseMapResolver';
import { resolveFromMap } from './MapResolver';
import { createKeyMatcher, createKeyResolver } from './matcher/KeyMatcher';

export const createTypeMapResolver = (ctx, config) => {
  return new TypeMapResolver(ctx, config);
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
    const { type, field, name, mapName, map } = ctx;
    const error = config.error;
    const log = config.log || console.log;
    const typeName = typeof type === 'string' ? type : type.name;

    if (!field) {
      this.error('missing field in ctx', ctx);
    }

    const functions = ctx.functions || {};
    const fieldName = field.name;
    const fieldType = field.type;

    this.init(mapName, { maps: config.maps, map });
    this.mapName = mapName;
    const resolvers = this.resolversFor(mapName);
    const factories = this.resolversFor(mapName);

    this.resolveFromMap = resolvers.resolveFromMap || resolveFromMap;

    // console.log('' + resolvers.resolveResult);

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
  }

  init(name, { maps, map }) {
    const confMap = map || this.mapsDataFor(name, maps);

    this.functions = {
      ...this.functions
    };
    this.typeFieldMap = confMap.typeMap || {};
    this.fieldMap = confMap.fieldMap || {};
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
