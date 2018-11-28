import * as maps from './maps';
import { BaseMapResolver } from './common/BaseMapResolver';
import { resolveFromFieldMap } from './common/FieldMap';
import { createKeyMatcher } from './common/KeyMatcher';

export class MapResolver extends BaseMapResolver {
  fieldMap: any;
  context: any;
  typeFieldMap: any;
  resolveFromFieldMap: (ctx, config?) => any;
  functions: any;

  constructor(confName, ctx: any = {}, config: any = {}) {
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

    const confMap = this.mapsFor(confName, maps);
    const funs = this.funsFor(confName);

    const typeMap = confMap.typeMap || {};
    this.fieldMap = confMap.fieldMap || {};

    const typeMapForName = typeMap[typeName] || {};
    this.typeFieldMap = typeMapForName[fieldName];

    const $createKeyMatcher = funs.createKeyMatcher || this.createKeyMatcher;
    this.resolveFromFieldMap = funs.resolveFromFieldMap || resolveFromFieldMap;

    this.functions = {
      createKeyMatcher: $createKeyMatcher
    };

    this.context = {
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

  resolve() {
    return this.resolveMap(this.typeFieldMap) || this.resolveMap(this.fieldMap);
  }

  get createKeyMatcher() {
    return createKeyMatcher;
  }

  resolveMap(map) {
    if (!map) {
      return null;
    }
    return this.resolveFromFieldMap({
      fieldMap: map,
      ...this.context
    });
  }
}
