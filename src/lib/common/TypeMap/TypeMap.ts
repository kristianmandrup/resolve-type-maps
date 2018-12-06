import { EntryMatcher } from '../EntryMatcher';
import { TypeMapEntryResolver } from './TypeMapEntryResolver';

export class TypeMap extends EntryMatcher {
  constructor(ctx: any, config = {}) {
    super(ctx, config);
  }

  findTypeMap(typeMap, typeName) {
    return typeMap[typeName] || typeMap || {};
  }

  createEntryResolver(typeName, typeMap) {
    return new TypeMapEntryResolver(
      {
        ...this.ctx,
        typeName,
        typeMap
      },
      this.config
    );
  }

  resolve(typeMap, typeNameToMatch) {
    const matchingTypeMap = this.findTypeMap(typeMap, typeNameToMatch);
    const typeNamesInMap = Object.keys(matchingTypeMap);
    const resolver = this.createEntryResolver(typeNameToMatch, matchingTypeMap);
    return this.resolveInMap(typeNamesInMap, resolver, matchingTypeMap);
  }

  resolveInMap(typeNamesInMap, resolver, defaultResult = {}) {
    let result;
    typeNamesInMap.find(typeNameInMap => {
      result = resolver.resolve(typeNameInMap);
      return result;
    });
    return result || defaultResult;
  }
}
