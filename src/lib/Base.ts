import * as path from 'path';

export class Base {
  config: any;
  className: string;

  constructor(config) {
    this.config = config;
    if (this.isEnabled('logging')) {
      config.log = config.log || console.log;
    }
    if (config.log) {
      this.log = config.log;
    }
    this.className = this.constructor['name'];
  }

  get label() {
    return `[${this.className}]`;
  }

  log = (msg, data?) => {
    data
      ? console.error(this.label, msg, data)
      : console.error(this.label, msg);
  };

  warn = (msg, data?) => {
    data
      ? console.error(this.label, msg, data)
      : console.error(this.label, msg);
  };

  error = (msg, data?) => {
    msg = [this.label, msg].join(' ');
    data ? console.error(msg, data) : console.error(msg);
    throw new Error(msg);
  };

  isEnabled(name) {
    const enabled = this.config.enable || {};
    return enabled[name];
  }

  get rootPath() {
    return path.join(__dirname, '..');
  }

  isObject(obj) {
    return obj === Object(obj);
  }

  isFullObject(obj) {
    return obj === Object(obj) && Object.keys(obj).length > 0;
  }

  validateFunction(args: any = {}) {
    const { method, functionName, func, data, error } = args;
    const $error = error || this.error;
    const $functionName = functionName || func.name;
    if (typeof func !== 'function') {
      $error(`${method}: missing or invalid ${functionName} function`, {
        [$functionName]: func,
        ...data
      });
    }
  }
}
