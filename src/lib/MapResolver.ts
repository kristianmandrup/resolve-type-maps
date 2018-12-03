import { BaseMapResolver } from './common/BaseMapResolver';
import { resolveFromFieldMap } from './common/FieldMap';
import { createKeyMatcher, createKeyResolver } from './common/KeyMatcher';

export class MapResolver extends BaseMapResolver {
  fieldMap: any;
  context: any;
  typeFieldMap: any;
  resolveFromFieldMap: (ctx, config?) => any;
  functions: any;
  mapName: string;

  constructor(mapName, ctx: any = {}, config: any = {}) {
    super(ctx, config);
    const { type, field, name } = ctx;
    const error = config.error;
    const log = config.log || console.log;
    const typeName = typeof type === 'string' ? type : type.name;
    if (!field) {
      this.error('missing field in ctx', ctx);
    }

    const fieldName = field.name;
    const fieldType = field.type;

    this.init(mapName, { maps: config.maps, typeName });
    this.mapName = mapName;
    const resolvers = this.resolversFor(mapName);
    const factories = this.resolversFor(mapName);

    const createKeyMatcher =
      factories.createKeyMatcher || this.createKeyMatcher;
    const createKeyResolver =
      factories.createKeyResolver || this.createKeyResolver;
    this.resolveFromFieldMap =
      resolvers.resolveFromFieldMap || resolveFromFieldMap;

    this.functions = {
      createKeyMatcher,
      createKeyResolver,
      ...resolvers
    };

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

  init(name, { maps, typeName }) {
    const confMap = this.mapsFor(name, maps);

    this.functions = {
      ...this.functions
    };
    const typeMap = confMap.typeMap || {};
    this.fieldMap = confMap.fieldMap || {};

    const typeFieldMap = typeMap[typeName] || {};
    this.typeFieldMap = typeFieldMap;
  }

  resolve() {
    return this.resolveMap(this.typeFieldMap) || this.resolveMap(this.fieldMap);
  }

  get createKeyMatcher() {
    return createKeyMatcher;
  }

  get createKeyResolver() {
    return createKeyResolver;
  }

  resolveMap(map) {
    if (!map) {
      return null;
    }
    return this.resolveFromFieldMap(
      {
        fieldMap: map,
        ...this.context
      },
      this.config
    );
  }
}
