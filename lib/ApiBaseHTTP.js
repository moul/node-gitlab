(function() {
  var ApiBase, debug, querystring, slumber,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  debug = require('debug')('gitlab:ApiBaseHTTP');

  ApiBase = require('./ApiBase').ApiBase;

  querystring = require('querystring');

  slumber = require('slumber');

  module.exports.ApiBaseHTTP = (function(superClass) {
    extend(ApiBaseHTTP, superClass);

    function ApiBaseHTTP() {
      this.patch = bind(this.patch, this);
      this.put = bind(this.put, this);
      this.post = bind(this.post, this);
      this["delete"] = bind(this["delete"], this);
      this.get = bind(this.get, this);
      this.fn_wrapper = bind(this.fn_wrapper, this);
      this.prepare_opts = bind(this.prepare_opts, this);
      this.init = bind(this.init, this);
      this.handleOptions = bind(this.handleOptions, this);
      return ApiBaseHTTP.__super__.constructor.apply(this, arguments);
    }

    ApiBaseHTTP.prototype.handleOptions = function() {
      var base, base1, base2;
      ApiBaseHTTP.__super__.handleOptions.apply(this, arguments);
      if ((base = this.options).base_url == null) {
        base.base_url = '';
      }
      if (!this.options.url) {
        throw "`url` is mandatory";
      }
      if (!(this.options.token || this.options.oauth_token)) {
        throw "`private_token` or `oauth_token` is mandatory";
      }
      if ((base1 = this.options).slumber == null) {
        base1.slumber = {};
      }
      if ((base2 = this.options.slumber).append_slash == null) {
        base2.append_slash = false;
      }
      this.options.url = this.options.url.replace(/\/api\/v3/, '');
      if (this.options.auth != null) {
        this.options.slumber.auth = this.options.auth;
      }
      return debug("handleOptions()");
    };

    ApiBaseHTTP.prototype.init = function() {
      var api;
      ApiBaseHTTP.__super__.init.apply(this, arguments);
      api = slumber.API(this.options.url, this.options.slumber);
      return this.slumber = api(this.options.base_url);
    };

    ApiBaseHTTP.prototype.prepare_opts = function(opts) {
      if (opts.__query == null) {
        opts.__query = {};
      }
      if (this.options.token) {
        opts.headers = {
          'PRIVATE-TOKEN': this.options.token
        };
      } else {
        opts.headers = {
          'Authorization': 'Bearer ' + this.options.oauth_token
        };
      }
      return opts;
    };

    ApiBaseHTTP.prototype.fn_wrapper = function(fn) {
      return (function(_this) {
        return function(err, response, ret) {
          var arity;
          arity = fn.length;
          switch (arity) {
            case 1:
              return fn(ret);
            case 2:
              return fn(err, ret || JSON.parse(response.body).message);
            case 3:
              return fn(err, response, ret);
          }
        };
      })(this);
    };

    ApiBaseHTTP.prototype.get = function(path, query, fn) {
      var opts;
      if (query == null) {
        query = {};
      }
      if (fn == null) {
        fn = null;
      }
      if ('function' === typeof query) {
        fn = query;
        query = {};
      }
      opts = this.prepare_opts(query);
      return this.slumber(path).get(opts, this.fn_wrapper(fn));
    };

    ApiBaseHTTP.prototype["delete"] = function(path, fn) {
      var opts;
      if (fn == null) {
        fn = null;
      }
      opts = this.prepare_opts({});
      return this.slumber(path)["delete"](opts, this.fn_wrapper(fn));
    };

    ApiBaseHTTP.prototype.post = function(path, data, fn) {
      var opts;
      if (data == null) {
        data = {};
      }
      if (fn == null) {
        fn = null;
      }
      opts = this.prepare_opts(data);
      return this.slumber(path).post(opts, this.fn_wrapper(fn));
    };

    ApiBaseHTTP.prototype.put = function(path, data, fn) {
      var opts;
      if (data == null) {
        data = {};
      }
      if (fn == null) {
        fn = null;
      }
      opts = this.prepare_opts(data);
      return this.slumber(path).put(opts, this.fn_wrapper(fn));
    };

    ApiBaseHTTP.prototype.patch = function(path, data, fn) {
      var opts;
      if (data == null) {
        data = {};
      }
      if (fn == null) {
        fn = null;
      }
      opts = this.prepare_opts(data);
      return this.slumber(path).patch(opts, this.fn_wrapper(fn));
    };

    return ApiBaseHTTP;

  })(ApiBase);

}).call(this);
