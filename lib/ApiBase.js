(function() {
  var debug,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  debug = require('debug')('gitlab:ApiBase');

  module.exports.ApiBase = (function() {
    function ApiBase(options) {
      this.options = options;
      this.init = bind(this.init, this);
      this.handleOptions = bind(this.handleOptions, this);
      this.handleOptions();
      this.init();
      debug("constructor()");
    }

    ApiBase.prototype.handleOptions = function() {
      var base;
      if ((base = this.options).verbose == null) {
        base.verbose = false;
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
