(function() {
  var BaseModel, Labels, Utils,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  BaseModel = require('../BaseModel');

  Utils = require('../Utils');

  Labels = (function(superClass) {
    extend(Labels, superClass);

    function Labels() {
      this.create = bind(this.create, this);
      return Labels.__super__.constructor.apply(this, arguments);
    }

    Labels.prototype.create = function(projectId, params, fn) {
      if (params == null) {
        params = {};
      }
      if (fn == null) {
        fn = null;
      }
      this.debug("Labels::create()");
      return this.post("projects/" + (Utils.parseProjectId(projectId)) + "/labels", params, function(data) {
        if (fn) {
          return fn(data);
        }
      });
    };

    return Labels;

  })(BaseModel);

  module.exports = function(client) {
    return new Labels(client);
  };

}).call(this);
