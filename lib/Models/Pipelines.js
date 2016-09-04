(function() {
  var BaseModel, Pipelines, Utils,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  BaseModel = require('../BaseModel');

  Utils = require('../Utils');

  Pipelines = (function(superClass) {
    extend(Pipelines, superClass);

    function Pipelines() {
      this.all = bind(this.all, this);
      return Pipelines.__super__.constructor.apply(this, arguments);
    }

    Pipelines.prototype.all = function(projectId, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Pipelines::all()");
      return this.get("projects/" + (Utils.parseProjectId(projectId)) + "/pipelines", (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    return Pipelines;

  })(BaseModel);

  module.exports = function(client) {
    return new Pipelines(client);
  };

}).call(this);
