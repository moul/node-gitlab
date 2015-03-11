(function() {
  var BaseModel, ProjectKeys, Utils,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  BaseModel = require('../BaseModel');

  Utils = require('../Utils');

  ProjectKeys = (function(superClass) {
    extend(ProjectKeys, superClass);

    function ProjectKeys() {
      this.addKey = bind(this.addKey, this);
      this.getKey = bind(this.getKey, this);
      this.listKeys = bind(this.listKeys, this);
      return ProjectKeys.__super__.constructor.apply(this, arguments);
    }

    ProjectKeys.prototype.listKeys = function(projectId, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("ProjectKeys::listKeys()");
      return this.get("projects/" + (Utils.parseProjectId(projectId)) + "/keys", (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    ProjectKeys.prototype.getKey = function(projectId, keyId, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("ProjectKeys::getKey()");
      return this.get("projects/" + (Utils.parseProjectId(projectId)) + "/keys/" + (parseInt(keyId)), (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    ProjectKeys.prototype.addKey = function(projectId, params, fn) {
      if (params == null) {
        params = {};
      }
      if (fn == null) {
        fn = null;
      }
      this.debug("ProjectKeys::addKey()");
      return this.post("projects/" + (Utils.parseProjectId(projectId)) + "/keys", params, (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    return ProjectKeys;

  })(BaseModel);

  module.exports = function(client) {
    return new ProjectKeys(client);
  };

}).call(this);
