(function() {
  var BaseModel, ProjectRepository, Utils,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  BaseModel = require('../BaseModel');

  Utils = require('../Utils');

  ProjectRepository = (function(superClass) {
    extend(ProjectRepository, superClass);

    function ProjectRepository() {
      this.updateFile = bind(this.updateFile, this);
      this.createFile = bind(this.createFile, this);
      this.showFile = bind(this.showFile, this);
      this.listTree = bind(this.listTree, this);
      this.diffCommit = bind(this.diffCommit, this);
      this.showCommit = bind(this.showCommit, this);
      this.listCommits = bind(this.listCommits, this);
      this.listTags = bind(this.listTags, this);
      this.deleteBranch = bind(this.deleteBranch, this);
      this.createBranch = bind(this.createBranch, this);
      this.unprotectBranch = bind(this.unprotectBranch, this);
      this.protectBranch = bind(this.protectBranch, this);
      this.showBranch = bind(this.showBranch, this);
      this.listBranches = bind(this.listBranches, this);
      return ProjectRepository.__super__.constructor.apply(this, arguments);
    }

    ProjectRepository.prototype.listBranches = function(projectId, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::listBranches()");
      return this.get("projects/" + (Utils.parseProjectId(projectId)) + "/repository/branches", fn);
    };

    ProjectRepository.prototype.showBranch = function(projectId, branchId, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::branch()");
      return this.get("projects/" + (Utils.parseProjectId(projectId)) + "/repository/branches/" + (encodeURI(branchId)), fn);
    };

    ProjectRepository.prototype.protectBranch = function(projectId, branchId, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::protectBranch()");
      return this.put("projects/" + (Utils.parseProjectId(projectId)) + "/repository/branches/" + (encodeURI(branchId)) + "/protect", null, fn);
    };

    ProjectRepository.prototype.unprotectBranch = function(projectId, branchId, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::unprotectBranch()");
      return this.put("projects/" + (Utils.parseProjectId(projectId)) + "/repository/branches/" + (encodeURI(branchId)) + "/unprotect", null, fn);
    };

    ProjectRepository.prototype.createBranch = function(params, fn) {
      if (params == null) {
        params = {};
      }
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::createBranch()", params);
      return this.post("projects/" + (Utils.parseProjectId(params.projectId)) + "/repository/branches", params, fn);
    };

    ProjectRepository.prototype.deleteBranch = function(projectId, branchId, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::deleteBranch()");
      return this["delete"]("projects/" + (Utils.parseProjectId(projectId)) + "/repository/branches/" + (encodeURI(branchId)), fn);
    };

    ProjectRepository.prototype.listTags = function(projectId, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::listTags()");
      return this.get("projects/" + (Utils.parseProjectId(projectId)) + "/repository/tags", fn);
    };

    ProjectRepository.prototype.listCommits = function(projectId, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::listCommits()");
      return this.get("projects/" + (Utils.parseProjectId(projectId)) + "/repository/commits", fn);
    };

    ProjectRepository.prototype.showCommit = function(projectId, commitId, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::commit()");
      return this.get("projects/" + (Utils.parseProjectId(projectId)) + "/repository/branches/" + (parseInt(commitId)), fn);
    };

    ProjectRepository.prototype.diffCommit = function(projectId, sha, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::diffCommit()");
      return this.get("projects/" + (Utils.parseProjectId(projectId)) + "/repository/branches/" + sha, fn);
    };

    ProjectRepository.prototype.listTree = function(projectId, params, fn) {
      if (params == null) {
        params = {};
      }
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::listTree()");
      if ('function' === typeof params) {
        fn = params;
        params = {};
      }
      return this.get("projects/" + (Utils.parseProjectId(projectId)) + "/repository/tree", params, fn);
    };

    ProjectRepository.prototype.showFile = function(projectId, params, fn) {
      if (params == null) {
        params = {};
      }
      if (fn == null) {
        fn = null;
      }
      if ('function' === typeof params) {
        fn = params;
        params = projectId;
      } else {
        params.projectId = projectId;
      }
      this.debug("Projects::showFile()", params);
      if (params.file_path && params.ref) {
        return this.get("projects/" + (Utils.parseProjectId(params.projectId)) + "/repository/files", params, fn);
      }
    };

    ProjectRepository.prototype.createFile = function(params, fn) {
      if (params == null) {
        params = {};
      }
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::createFile()", params);
      return this.post("projects/" + (Utils.parseProjectId(params.projectId)) + "/repository/files", params, fn);
    };

    ProjectRepository.prototype.updateFile = function(params, fn) {
      if (params == null) {
        params = {};
      }
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::updateFile()", params);
      return this.put("projects/" + (Utils.parseProjectId(params.projectId)) + "/repository/files", params, fn);
    };

    return ProjectRepository;

  })(BaseModel);

  module.exports = function(client) {
    return new ProjectRepository(client);
  };

}).call(this);
