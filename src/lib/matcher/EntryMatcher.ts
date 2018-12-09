import { BaseMapResolver } from '../BaseMapResolver';
import { ItemMatcher } from './ItemMatcher';

// const lower = (str: string) => str.toLowerCase();
const capitalize = (str: string) => str.replace(/^\w/, c => c.toUpperCase());

// todo: rename to resolver
export class EntryMatcher extends BaseMapResolver {
  resolveResult: (obj: any) => any;
  name: string;
  opts: any;

  constructor(ctx: any, config: any = {}) {
    super(ctx, config);
    const { name } = ctx;
    const opts = ctx.opts || {};
    if (!name) {
      this.error('missing name', ctx);
    }
    this.opts = opts;
    this.name = name;

    this.setFunctions();
  }

  setFunctions() {
    const { resolveResult, resolveTypeEntry } = this.functions;
    this.validateFunction({
      method: 'setFunctions',
      func: resolveResult,
      data: this.functions
    });

    this.resolveResult = this.opts.isType
      ? resolveTypeEntry || resolveResult
      : resolveResult;
  }

  resolveMatches(obj, name: string, opts = {}) {
    if (typeof name !== 'string') {
      this.error('resolveMatches: missing or invalid name', {
        obj,
        name
      });
    }
    if (!obj) {
      this.error('resolveMatches: invalid entry object', {
        obj,
        name
      });
    }
    if (typeof obj === 'string') {
      return this.defaultMatches(obj, opts);
    }
    const matches = obj.match || obj.matches || this.keyToMatchName(name);
    return this.createMatches(matches);
  }

  // Note: can be used to transform f.ex persons into Person for matching on type
  keyToMatchName(name) {
    return name;
  }

  createMatches(matches) {
    return Array.isArray(matches) ? matches : [matches];
  }

  defaultMatches(str, opts: any = {}) {
    return opts.isType ? [str, capitalize(str)] : [str];
  }

  matchResult(obj, matches) {
    if (!this.resolveResult) {
      this.error('missing function: resolveResult', this.ctx);
    }
    // todo: make generic
    const isMatching = this.findMatch(matches || []);

    const result = isMatching ? this.resolveResult(obj) : null;
    return result;
  }

  findMatch(matches): boolean {
    if (!Array.isArray(matches)) {
      this.error(
        'findMatch: Invalid matches. Must be an array or object with a find function',
        { matches }
      );
    }
    if (typeof matches.find !== 'function') {
      this.error('matches missing find function', { matches });
    }
    const matched = matches.find(matchItem => {
      const matcher = this.createItemMatcher(matchItem);
      return matcher.match();
    });
    return Boolean(matched);
  }

  createItemMatcher(matchItem) {
    return new ItemMatcher({ matchItem, ...this.ctx }, this.config);
  }
}
