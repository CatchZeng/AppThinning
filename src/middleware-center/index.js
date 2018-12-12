const compose = require("./compose");

class MiddlewareCenter {
  constructor() {
    this._middlewares = [];
    this._context = null;
  }

  use(middleware) {
    if (typeof middleware != "function") {
      console.warn("middleware must be a function.");
      return null;
    }
    this._middlewares.push(middleware);
    return this;
  }

  handleRequest(context) {
    const fn = compose(this._middlewares);
    this._context = context;
    fn(this._context);
  }
}

module.exports = MiddlewareCenter;
