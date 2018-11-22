import { BaseMapResolver } from './BaseMapResolver';

export class EntryMatcher extends BaseMapResolver {
  resolveResult: (obj: any) => any;

  constructor(ctx: any, config = {}) {
    super(ctx, config);
    this.resolveResult = ctx.functions.resolveResult;
  }

  resolveMatches(obj, { key }) {
    if (typeof obj === 'string') {
      return [obj];
    }
    return obj.match || obj.matches || [key];
  }

  matchResult(obj, matches) {
    let result;
    // todo: make generic
    matches.find(matchItem => {
      if (this.matchName(matchItem)) {
        result = this.resolveResult(obj);
        return matchItem;
      }
    });
    return result;
  }

  matchName(matchItem) {
    const { regExpOpts, fieldName } = this.ctx;
    const regExp = this.prepareRegExp(matchItem, regExpOpts);
    return regExp.test(fieldName);
  }

  prepareRegExp(text, opts) {
    const regExpOpts = opts || 'i';
    return new RegExp(text, regExpOpts);
  }
}
