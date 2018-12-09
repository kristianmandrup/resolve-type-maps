import { BaseMapResolver } from '../BaseMapResolver';

export class ItemMatcher extends BaseMapResolver {
  matchItem: any;
  name: string;

  constructor(ctx: any, config = {}) {
    super(ctx, config);
    const { matchItem, name } = ctx;
    this.matchItem = matchItem;
    if (!name) {
      this.error('missing name', ctx);
    }
    this.name = name;
  }

  match() {
    return this.resolveMatchItem();
  }

  resolveMatchItem() {
    return this.resolveMatchFn() || this.resolveStringOrRegExp();
  }

  resolveMatchFn() {
    if (typeof this.matchItem !== 'function') return;
    return this.matchItem(this.name, this);
  }

  resolveStringOrRegExp() {
    const regExp = this.prepareRegExp(this.matchItem);
    return regExp ? regExp.test(this.name) : false;
  }

  prepareRegExp(matchExpr: string | RegExp): RegExp {
    if (!matchExpr) {
      this.error('Invalid match expression', {
        matchExpr,
        ctx: this.ctx
      });
    }
    let { regExpOpts } = this.ctx;
    regExpOpts = regExpOpts || 'i';
    return matchExpr instanceof RegExp
      ? matchExpr
      : new RegExp(matchExpr, regExpOpts);
  }
}
