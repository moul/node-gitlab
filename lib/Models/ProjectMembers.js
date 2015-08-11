(function() {
  var BaseModel, ProjectMembers, Utils,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  BaseModel = require('../BaseModel');

  Utils = require('../Utils');

  ProjectMembers = (function(superClass) {
    extend(ProjectMembers, superClass);

    function ProjectMembers() {
      this.remove = bind(this.remove, this);
      this.update = bind(this.update, this);
      this.add = bind(this.add, this);
      this.show = bind(this.show, this);
      this.list = bind(this.list, this);
      return ProjectMembers.__super__.constructor.apply(this, arguments);
    }

    ProjectMembers.prototype.list = function(projectId, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::members()");
      return this.get("projects/" + (Utils.parseProjectId(projectId)) + "/members", (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    ProjectMembers.prototype.show = function(projectId, userId, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::member()");
      return this.get("projects/" + (Utils.parseProjectId(projectId)) + "/members/" + (parseInt(userId)), (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    ProjectMembers.prototype.add = function(projectId, userId, accessLevel, fn) {
      var params;
      if (accessLevel == null) {
        accessLevel = 30;
      }
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::addMember()");
      params = {
        user_id: parseInt(userId),
        access_level: parseInt(accessLevel)
      };
      return this.post("projects/" + (Utils.parseProjectId(projectId)) + "/members", params, (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    ProjectMembers.prototype.update = function(projectId, userId, accessLevel, fn) {
      var params;
      if (accessLevel == null) {
        accessLevel = 30;
      }
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::saveMember()");
      params = {
        access_level: parseInt(accessLevel)
      };
      return this.put("projects/" + (Utils.parseProjectId(projectId)) + "/members/" + (parseInt(userId)), params, (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    ProjectMembers.prototype.remove = function(projectId, userId, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::removeMember()");
      return this["delete"]("projects/" + (Utils.parseProjectId(projectId)) + "/members/" + (parseInt(userId)), (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    return ProjectMembers;

  })(BaseModel);

  module.exports = function(client) {
    return new ProjectMembers(client);
  };

}).call(this);
