import { EntryMatcher } from '../EntryMatcher';
import { TypeMapResolver } from './TypeMapResolver';

const identity = obj => obj;

export class TypeMap extends EntryMatcher {
  constructor(ctx: any, config = {}) {
    super(ctx, config);
    this.resolveResult = identity;
  }

  findTypeMap(typeMap, typeName) {
    return typeMap[typeName] || {};
  }

  createEntryResolver({ typeNameToMatch, matchingTypeMap }) {
    return new TypeMapResolver(
      { typeNameToMatch, matchingTypeMap },
      this.config
    );
  }

  resolve(typeMap, typeNameToMatch) {
    const matchingTypeMap = this.findTypeMap(typeMap, typeNameToMatch);
    const typeNamesInMap = Object.keys(matchingTypeMap);
    let result;
    const resolver = this.createEntryResolver({
      typeNameToMatch,
      matchingTypeMap
    });
    typeNamesInMap.find(typeNameInMap => {
      result = resolver.resolve(typeNameInMap);
      return result;
    });
    return result || matchingTypeMap;
  }
}
