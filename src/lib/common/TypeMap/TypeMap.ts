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

  resolve(typeMap, typeNameToMatch) {
    const matchingTypeMap = this.findTypeMap(typeMap, typeNameToMatch);
    const typeNamesInMap = Object.keys(matchingTypeMap);
    let result;
    const resolver = new TypeMapResolver(
      { typeNameToMatch, matchingTypeMap },
      this.config
    );
    typeNamesInMap.find(typeNameInMap => {
      result = resolver.resolve(typeNameInMap);
      return result;
    });
    return result || matchingTypeMap;
  }
}
