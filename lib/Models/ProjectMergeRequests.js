(function() {
  var BaseModel, ProjectMergeRequests, Utils,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  BaseModel = require('../BaseModel');

  Utils = require('../Utils');

  ProjectMergeRequests = (function(superClass) {
    extend(ProjectMergeRequests, superClass);

    function ProjectMergeRequests() {
      this.merge = bind(this.merge, this);
      this.comment = bind(this.comment, this);
      this.update = bind(this.update, this);
      this.add = bind(this.add, this);
      this.show = bind(this.show, this);
      this.list = bind(this.list, this);
      return ProjectMergeRequests.__super__.constructor.apply(this, arguments);
    }

    ProjectMergeRequests.prototype.list = function(projectId, params, fn) {
      if (params == null) {
        params = {};
      }
      if (fn == null) {
        fn = null;
      }
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
      this.debug("Projects::mergerequests()");
      return this.get("projects/" + (Utils.parseProjectId(projectId)) + "/merge_requests", params, (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    ProjectMergeRequests.prototype.show = function(projectId, mergerequestId, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::mergerequest()");
      return this.get("projects/" + (Utils.parseProjectId(projectId)) + "/merge_request/" + (parseInt(mergerequestId)), (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    ProjectMergeRequests.prototype.add = function(projectId, sourceBranch, targetBranch, assigneeId, title, fn) {
      var params;
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::addMergeRequest()");
      params = {
        id: Utils.parseProjectId(projectId),
        source_branch: sourceBranch,
        target_branch: targetBranch,
        title: title
      };
      if (assigneeId !== void 0) {
        params.assigneeId = parseInt(assigneeId);
      }
      return this.post("projects/" + (Utils.parseProjectId(projectId)) + "/merge_requests", params, (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    ProjectMergeRequests.prototype.update = function(projectId, mergerequestId, params, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::saveMergeRequest()");
      params.id = Utils.parseProjectId(projectId);
      params.merge_request_id = parseInt(mergerequestId);
      return this.put("projects/" + (Utils.parseProjectId(projectId)) + "/merge_request/" + (parseInt(mergerequestId)), params, (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    ProjectMergeRequests.prototype.comment = function(projectId, mergerequestId, note, fn) {
      var params;
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::commentMergeRequest()");
      params = {
        id: Utils.parseProjectId(projectId),
        merge_request_id: parseInt(mergerequestId),
        note: note
      };
      return this.post("projects/" + (Utils.parseProjectId(projectId)) + "/merge_request/" + (parseInt(mergerequestId)) + "/comments", params, (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    ProjectMergeRequests.prototype.merge = function(projectId, mergerequestId, params, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::acceptMergeRequest()");
      params.id = Utils.parseProjectId(projectId);
      params.merge_request_id = parseInt(mergerequestId);
      return this.put("projects/" + (Utils.parseProjectId(projectId)) + "/merge_request/" + (parseInt(mergerequestId)) + "/merge", params, (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    return ProjectMergeRequests;

  })(BaseModel);

  module.exports = function(client) {
    return new ProjectMergeRequests(client);
  };

}).call(this);
