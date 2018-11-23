import * as path from 'path';

export class Base {
  config: any;
  log: (...args) => void;

  constructor(config) {
    this.config = config;
    if (this.isEnabled('logging')) {
      config.log = config.log || console.log;
    }
    this.log = config.log;
  }

  warn(msg, data?) {
    data ? console.error(msg, data) : console.error(msg);
  }

  error(msg, data?) {
    data ? console.error(msg, data) : console.error(msg);
    throw new Error(msg);
  }

  isEnabled(name) {
    const enabled = this.config.enable || {};
    return enabled[name];
  }

  get rootPath() {
    return path.join(__dirname, '..');
  }

  validateFunction({ method, functionName, func, data, error }) {
    if (typeof func !== 'function') {
      error(`${method}: missing or invalid ${functionName} function`, {
        [functionName]: func,
        ...data
      });
    }
  }
}
