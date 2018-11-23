import { BaseMapResolver } from './BaseMapResolver';

export class ItemMatcher extends BaseMapResolver {
  matchItem: any;
  name: string;

  constructor(ctx: any, config = {}) {
    super(ctx, config);
    const { matchItem, name } = ctx;
    this.matchItem = matchItem;
    this.name = name;
  }

  match() {
    return this.resolveMatchItem();
  }

  resolveMatchItem() {
    return typeof this.matchItem === 'function'
      ? this.resolveMatchFn()
      : this.resolveStringOrRegExp();
  }

  resolveMatchFn() {
    return this.matchItem(this.name, this);
  }

  resolveStringOrRegExp() {
    const regExp = this.prepareRegExp(this.matchItem);
    return regExp ? regExp.test(this.name) : false;
  }

  prepareRegExp(matchExpr): RegExp {
    let { regExpOpts } = this.ctx;
    regExpOpts = regExpOpts || 'i';
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
