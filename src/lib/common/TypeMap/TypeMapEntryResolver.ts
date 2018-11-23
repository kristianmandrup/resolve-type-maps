import { EntryMatcher } from '../EntryMatcher';

export class TypeMapEntryResolver extends EntryMatcher {
  typeMap: any;
  typeName: string;

  constructor(ctx: any, config = {}) {
    super(ctx, config);
    const { typeMap, typeName } = ctx;
    this.typeMap = typeMap;
    this.typeName = typeName;
  }

  findTypeMap(typeMap, typeName) {
    return typeMap[typeName] || {};
  }

  resolve(entryName) {
    const matches = this.resolveMatches(this.typeName, {
      key: entryName
    });
    const typeDef = this.typeMap[entryName];
    return this.matchResult(typeDef, matches);
  }
}
