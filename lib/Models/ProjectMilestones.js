(function() {
  var BaseModel, ProjectMilestones, Utils,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __hasProp = {}.hasOwnProperty;

  BaseModel = require('../BaseModel');

  Utils = require('../Utils');

  ProjectMilestones = (function(_super) {
    __extends(ProjectMilestones, _super);

    function ProjectMilestones() {
      this.update = __bind(this.update, this);
      this.add = __bind(this.add, this);
      this.show = __bind(this.show, this);
      this.list = __bind(this.list, this);
      return ProjectMilestones.__super__.constructor.apply(this, arguments);
    }

    ProjectMilestones.prototype.list = function(projectId, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::milestones()");
      return this.get("projects/" + (Utils.parseProjectId(projectId)) + "/milestones", (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    ProjectMilestones.prototype.show = function(projectId, milestoneId, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::milestone()");
      return this.get("projects/" + (Utils.parseProjectId(projectId)) + "/milestones/" + (parseInt(milestoneId)), (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    ProjectMilestones.prototype.add = function(projectId, title, description, due_date, fn) {
      var params;
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::addMilestone()");
      params = {
        id: Utils.parseProjectId(projectId),
        title: title,
        description: description,
        due_date: due_date
      };
      return this.post("projects/" + (Utils.parseProjectId(projectId)) + "/milestones", params, (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    ProjectMilestones.prototype.update = function(projectId, milestoneId, title, description, due_date, state_event, fn) {
      var params;
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::editMilestone()");
      params = {
        id: Utils.parseProjectId(projectId),
        title: title,
        description: description,
        due_date: due_date,
        state_event: state_event
      };
      return this.put("projects/" + (Utils.parseProjectId(projectId)) + "/milestones/" + (parseInt(milestoneId)), params, (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    return ProjectMilestones;

  })(BaseModel);

  module.exports = function(client) {
    return new ProjectMilestones(client);
  };

}).call(this);
