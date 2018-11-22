import { EntryMatcher } from './EntryMatcher';

const identity = obj => obj;

export class TypeMap extends EntryMatcher {
  constructor(ctx: any, config = {}) {
    super(ctx, config);
    this.resolveResult = identity;
  }

  resolve(typeMap, typeName) {
    const hit = typeMap[typeName] || {};
    let result;
    Object.keys(typeMap).find(name => {
      const obj = typeMap[name];
      const matches = this.resolveMatches(obj, { key: name });
      result = this.matchResult(obj, matches);
      return result;
    });
    return result || hit;
  }
}
