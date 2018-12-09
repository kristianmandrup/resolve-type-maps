import { Base } from './Base';

export class BaseMapResolver extends Base {
  ctx: any;
  functions: any;
  resolvers: any;

  constructor(ctx: any = {}, config = {}) {
    super(config);
    this.ctx = ctx;
    const functions = ctx.functions || {};
    this.functions = functions;
  }

  mapsFor(name, defaultMap = {}) {
    const maps = this.config.maps || defaultMap || {};
    return maps[name] || {};
  }

  mapsDataFor(name, defaultMap = {}) {
    return this.mapsFor(name, defaultMap).data || {};
  }

  resolversFor(name) {
    return this.mapsFor(name).resolvers || {};
  }

  factoriesFor(name) {
    return this.mapsFor(name).factories || {};
  }
}
