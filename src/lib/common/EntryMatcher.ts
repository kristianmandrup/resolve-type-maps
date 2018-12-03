import { BaseMapResolver } from './BaseMapResolver';
import { ItemMatcher } from './ItemMatcher';

export class EntryMatcher extends BaseMapResolver {
  resolveResult: (obj: any) => any;
  name: string;

  constructor(ctx: any, config: any = {}) {
    super(ctx, config);
    const { name } = ctx;
    if (!name) {
      this.error('missing name', ctx);
    }
    this.name = name;
    const { resolveResult } = this.functions;

    if (!resolveResult) {
      this.error('missing resolveResult in resolvers map of config', {
        name: this.name,
        resolvers: this.resolvers,
        config
      });
    }

    this.resolveResult = resolveResult;
  }

  resolveMatches(obj, { key }) {
    if (typeof obj === 'string') {
      return [obj];
    }
    const matches = obj.match || obj.matches || key;
    return Array.isArray(matches) ? matches : [matches];
  }

  matchResult(obj, matches) {
    if (!this.resolveResult) {
      this.error('missing function: resolveResult', this.ctx);
    }
    // todo: make generic
    const isMatching = this.findMatch(matches || []);
    return isMatching ? this.resolveResult(obj) : null;
  }

  findMatch(matches) {
    if (!Array.isArray(matches)) {
      this.error(
        'findMatch: Invalid matches. Must be an array or object with a find function',
        { matches }
      );
    }
    if (typeof matches.find !== 'function') {
      this.error('matches missing find function', { matches });
    }
    return matches.find(matchItem => {
      return this.createItemMatcher(matchItem).match();
    });
  }

  createItemMatcher(matchItem) {
    return new ItemMatcher({ matchItem, ...this.ctx }, this.config);
  }
}
