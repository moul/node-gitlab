(function() {
  var BaseModel, ProjectIssues, Utils,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  BaseModel = require('../BaseModel');

  Utils = require('../Utils');

  ProjectIssues = (function(superClass) {
    extend(ProjectIssues, superClass);

    function ProjectIssues() {
      this.list = bind(this.list, this);
      this.init = bind(this.init, this);
      return ProjectIssues.__super__.constructor.apply(this, arguments);
    }

    ProjectIssues.prototype.init = function() {
      return this.notes = this.load('IssueNotes');
    };

    ProjectIssues.prototype.list = function(projectId, params, fn) {
      if (params == null) {
        params = {};
      }
      if (fn == null) {
        fn = null;
      }
      this.debug("ProjectIssues::issues()");
      if ('function' === typeof params) {
        fn = params;
        params = {};
      }
      if (params.page == null) {
        params.page = 1;
      }
      if (params.per_page == null) {
        params.per_page = 100;
      }
      return (function() {
        var cb, data;
        data = [];
        cb = (function(_this) {
          return function(err, retData) {
            if (err) {
              if (fn) {
                return fn(data);
              }
            }
            if (retData.length === params.per_page) {
              _this.debug("Recurse ProjectIssues::list()");
              data = data.concat(retData);
              params.page++;
              return _this.get("projects/" + (Utils.parseProjectId(projectId)) + "/issues", params, cb);
            } else {
              data = data.concat(retData);
              if (fn) {
                return fn(data);
              }
            }
          };
        })(this);
        return this.get("projects/" + (Utils.parseProjectId(projectId)) + "/issues", params, cb);
      }).bind(this)();
    };

    return ProjectIssues;

  })(BaseModel);

  module.exports = function(client) {
    return new ProjectIssues(client);
  };

}).call(this);
