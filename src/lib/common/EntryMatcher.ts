import { BaseMapResolver } from './BaseMapResolver';

export class EntryMatcher extends BaseMapResolver {
  resolveResult: (obj: any) => any;
  name: string;

  constructor(ctx: any, config = {}) {
    super(ctx, config);
    this.resolveResult = this.functions.resolveResult;
    this.name = ctx.name;
  }

  resolveMatches(obj, { key }) {
    if (typeof obj === 'string') {
      return [obj];
    }
    return obj.match || obj.matches || [key];
  }

  matchResult(obj, matches) {
    if (!this.resolveResult) {
      this.error('missing function: resolveResult', this.ctx);
    }
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
    const { ctx } = this;
    const { regExpOpts, name } = ctx;
    if (!name) {
      this.error('missing name', ctx);
    }
    const regExp = this.prepareRegExp(matchItem, regExpOpts);
    return regExp ? regExp.test(name) : false;
  }

  prepareRegExp(matchExpr, opts?): RegExp {
    const regExpOpts = opts || 'i';
    if (!matchExpr) {
      this.warn('Invalid match expression', {
        matchExpr,
        ctx: this.ctx
      });
    }

    return matchExpr instanceof RegExp
      ? matchExpr
      : new RegExp(matchExpr, regExpOpts);
  }
}
