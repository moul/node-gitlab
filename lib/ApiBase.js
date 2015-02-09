(function() {
  var debug,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  debug = require('debug')('gitlab:ApiBase');

  module.exports.ApiBase = (function() {
    function ApiBase(_at_options) {
      this.options = _at_options;
      this.init = __bind(this.init, this);
      this.handleOptions = __bind(this.handleOptions, this);
      this.handleOptions();
      this.init();
      debug("constructor()");
    }

    ApiBase.prototype.handleOptions = function() {
      var _base;
      if ((_base = this.options).verbose == null) {
        _base.verbose = false;
      }
      return debug("handleOptions()");
    };

    ApiBase.prototype.init = function() {
      this.client = this;
      debug("init()");
      this.groups = require('./Models/Groups')(this.client);
      this.projects = require('./Models/Projects')(this.client);
      this.issues = require('./Models/Issues')(this.client);
      this.notes = require('./Models/Notes')(this.client);
      this.users = require('./Models/Users')(this.client);
      return this.labels = require('./Models/Labels')(this.client);
    };

    return ApiBase;

  })();

}).call(this);
