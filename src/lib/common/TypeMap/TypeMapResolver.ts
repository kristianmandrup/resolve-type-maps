import { EntryMatcher } from '../EntryMatcher';

export class TypeMapResolver extends EntryMatcher {
  matchingTypeMap: any;
  typeNamesInMap: string[];
  typeNameToMatch: string;

  constructor(ctx: any, config = {}) {
    super(ctx, config);
    const { matchingTypeMap, typeNameToMatch } = ctx;
    this.matchingTypeMap = matchingTypeMap;
    this.typeNameToMatch = typeNameToMatch;
  }

  findTypeMap(typeMap, typeName) {
    return typeMap[typeName] || {};
  }

  resolve(typeNameInMap) {
    const matches = this.resolveMatches(this.typeNameToMatch, {
      key: typeNameInMap
    });
    const typeDef = this.matchingTypeMap[typeNameInMap];
    return this.matchResult(typeDef, matches);
  }
}
