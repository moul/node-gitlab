(function() {
  var BaseModel, ProjectServices, Utils,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  BaseModel = require('../BaseModel');

  Utils = require('../Utils');

  ProjectServices = (function(superClass) {
    extend(ProjectServices, superClass);

    function ProjectServices() {
      this.remove = bind(this.remove, this);
      this.update = bind(this.update, this);
      this.show = bind(this.show, this);
      return ProjectServices.__super__.constructor.apply(this, arguments);
    }

    ProjectServices.prototype.show = function(projectId, serviceName, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::showService()");
      return this.get("projects/" + (Utils.parseProjectId(projectId)) + "/services/" + serviceName, (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    ProjectServices.prototype.update = function(projectId, serviceName, params, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::updateService()");
      return this.put("projects/" + (Utils.parseProjectId(projectId)) + "/services/" + serviceName, params, (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    ProjectServices.prototype.remove = function(projectId, serviceName, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects:removeService()");
      return this["delete"]("projects/" + (Utils.parseProjectId(projectId)) + "/services/" + serviceName, (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    return ProjectServices;

  })(BaseModel);

  module.exports = function(client) {
    return new ProjectServices(client);
  };

}).call(this);
