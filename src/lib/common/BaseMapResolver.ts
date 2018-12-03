import { Base } from '../Base';

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

  get resolversMap() {
    const resolvers = this.config.resolvers || {};
    return resolvers.maps || {};
  }

  get factoriesMap() {
    const factories = this.config.factories || {};
    return factories.maps || {};
  }

  mapsFor(name, defaultMap = {}) {
    const maps = this.config.maps || {};
    return maps[name] || defaultMap || {};
  }

  resolversFor(name) {
    return this.resolversMap[name] || {};
  }

  factoriesFor(name) {
    return this.factoriesMap[name] || {};
  }
}
