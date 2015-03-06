(function() {
  var debug,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  debug = require('debug')('gitlab:BaseModel');

  module.exports = (function() {
    function exports(client) {
      this.client = client;
      this._init = bind(this._init, this);
      this.load = bind(this.load, this);
      this._init();
    }

    exports.prototype.load = function(model) {
      return require("./Models/" + model)(this.client);
    };

    exports.prototype._init = function() {
      this.debug = require('debug')("gitlab:Models:" + this.constructor.name);
      this.get = this.client.get;
      this.post = this.client.post;
      this.put = this.client.put;
      this["delete"] = this.client["delete"];
      if (this.init != null) {
        return this.init();
      }
    };

    return exports;

  })();

}).call(this);
