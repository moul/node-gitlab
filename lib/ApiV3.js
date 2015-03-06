(function() {
  var ApiBaseHTTP, debug,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  debug = require('debug')('gitlab:ApiV3');

  ApiBaseHTTP = require('./ApiBaseHTTP').ApiBaseHTTP;

  module.exports.ApiV3 = (function(superClass) {
    extend(ApiV3, superClass);

    function ApiV3() {
      this.handleOptions = bind(this.handleOptions, this);
      return ApiV3.__super__.constructor.apply(this, arguments);
    }

    ApiV3.prototype.handleOptions = function() {
      ApiV3.__super__.handleOptions.apply(this, arguments);
      this.options.base_url = 'api/v3';
      return debug("handleOptions()");
    };

    return ApiV3;

  })(ApiBaseHTTP);

}).call(this);
