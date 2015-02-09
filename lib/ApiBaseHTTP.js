(function() {
  var ApiBase, debug, querystring, slumber,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __hasProp = {}.hasOwnProperty;

  debug = require('debug')('gitlab:ApiBaseHTTP');

  ApiBase = require('./ApiBase').ApiBase;

  querystring = require('querystring');

  slumber = require('slumber');

  module.exports.ApiBaseHTTP = (function(_super) {
    __extends(ApiBaseHTTP, _super);

    function ApiBaseHTTP() {
      this.patch = __bind(this.patch, this);
      this.put = __bind(this.put, this);
      this.post = __bind(this.post, this);
      this["delete"] = __bind(this["delete"], this);
      this.get = __bind(this.get, this);
      this.fn_wrapper = __bind(this.fn_wrapper, this);
      this.prepare_opts = __bind(this.prepare_opts, this);
      this.init = __bind(this.init, this);
      this.handleOptions = __bind(this.handleOptions, this);
      return ApiBaseHTTP.__super__.constructor.apply(this, arguments);
    }

    ApiBaseHTTP.prototype.handleOptions = function() {
      var _base, _base1, _base2;
      ApiBaseHTTP.__super__.handleOptions.apply(this, arguments);
      if ((_base = this.options).base_url == null) {
        _base.base_url = '';
      }
      if (!this.options.url) {
        throw "`url` is mandatory";
      }
      if (!this.options.token) {
        throw "`private_token` is mandatory";
      }
      if ((_base1 = this.options).slumber == null) {
        _base1.slumber = {};
      }
      if ((_base2 = this.options.slumber).append_slash == null) {
        _base2.append_slash = false;
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
      opts.__query.private_token = this.options.token;
      return opts;
    };

    ApiBaseHTTP.prototype.fn_wrapper = function(fn) {
      return (function(_this) {
        return function(err, response, ret) {
          var arity, _ref;
          if (err) {
            debug('an error has occured', err);
            if ((400 <= (_ref = err.statusCode) && _ref <= 499)) {
              throw "Authorisation error. " + err.statusCode + ". Check your key.";
            }
          }
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
