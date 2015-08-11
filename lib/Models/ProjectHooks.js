(function() {
  var BaseModel, ProjectHooks, Utils,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  BaseModel = require('../BaseModel');

  Utils = require('../Utils');

  ProjectHooks = (function(superClass) {
    extend(ProjectHooks, superClass);

    function ProjectHooks() {
      this.remove = bind(this.remove, this);
      this.update = bind(this.update, this);
      this.add = bind(this.add, this);
      this.show = bind(this.show, this);
      this.list = bind(this.list, this);
      return ProjectHooks.__super__.constructor.apply(this, arguments);
    }

    ProjectHooks.prototype.list = function(projectId, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::hooks()");
      return this.get("projects/" + (Utils.parseProjectId(projectId)) + "/hooks", (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    ProjectHooks.prototype.show = function(projectId, hookId, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::hook()");
      return this.get("projects/" + (Utils.parseProjectId(projectId)) + "/hooks/" + (parseInt(hookId)), (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    ProjectHooks.prototype.add = function(projectId, params, fn) {
      if (fn == null) {
        fn = null;
      }
      if ('string' === typeof params) {
        params = {
          url: params
        };
      }
      this.debug("Projects::addHook()");
      return this.post("projects/" + (Utils.parseProjectId(projectId)) + "/hooks", params, (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    ProjectHooks.prototype.update = function(projectId, hookId, url, fn) {
      var params;
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::saveHook()");
      params = {
        access_level: parseInt(accessLevel)
      };
      return this.put("projects/" + (Utils.parseProjectId(projectId)) + "/hooks/" + (parseInt(hookId)), params, (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    ProjectHooks.prototype.remove = function(projectId, hookId, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::removeHook()");
      return this["delete"]("projects/" + (Utils.parseProjectId(projectId)) + "/hooks/" + (parseInt(hookId)), (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    return ProjectHooks;

  })(BaseModel);

  module.exports = function(client) {
    return new ProjectHooks(client);
  };

}).call(this);
