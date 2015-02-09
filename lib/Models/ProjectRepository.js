(function() {
  var BaseModel, ProjectRepository, Utils,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __hasProp = {}.hasOwnProperty;

  BaseModel = require('../BaseModel');

  Utils = require('../Utils');

  ProjectRepository = (function(_super) {
    __extends(ProjectRepository, _super);

    function ProjectRepository() {
      this.updateFile = __bind(this.updateFile, this);
      this.createFile = __bind(this.createFile, this);
      this.showFile = __bind(this.showFile, this);
      this.listTree = __bind(this.listTree, this);
      this.diffCommit = __bind(this.diffCommit, this);
      this.showCommit = __bind(this.showCommit, this);
      this.listCommits = __bind(this.listCommits, this);
      this.listTags = __bind(this.listTags, this);
      this.deleteBranch = __bind(this.deleteBranch, this);
      this.createBranch = __bind(this.createBranch, this);
      this.unprotectBranch = __bind(this.unprotectBranch, this);
      this.protectBranch = __bind(this.protectBranch, this);
      this.showBranch = __bind(this.showBranch, this);
      this.listBranches = __bind(this.listBranches, this);
      return ProjectRepository.__super__.constructor.apply(this, arguments);
    }

    ProjectRepository.prototype.listBranches = function(projectId, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::listBranches()");
      return this.get("projects/" + (Utils.parseProjectId(projectId)) + "/repository/branches", (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    ProjectRepository.prototype.showBranch = function(projectId, branchId, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::branch()");
      return this.get("projects/" + (Utils.parseProjectId(projectId)) + "/repository/branches/" + (encodeURI(branchId)), (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    ProjectRepository.prototype.protectBranch = function(projectId, branchId, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::protectBranch()");
      return this.put("projects/" + (Utils.parseProjectId(projectId)) + "/repository/branches/" + (encodeURI(branchId)) + "/protect", null, (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    ProjectRepository.prototype.unprotectBranch = function(projectId, branchId, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::unprotectBranch()");
      return this.put("projects/" + (Utils.parseProjectId(projectId)) + "/repository/branches/" + (encodeURI(branchId)) + "/unprotect", null, (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    ProjectRepository.prototype.createBranch = function(params, fn) {
      if (params == null) {
        params = {};
      }
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::createBranch()", params);
      return this.post("projects/" + (Utils.parseProjectId(params.projectId)) + "/repository/branches", params, (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    ProjectRepository.prototype.deleteBranch = function(projectId, branchId, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::deleteBranch()");
      return this["delete"]("projects/" + (Utils.parseProjectId(projectId)) + "/repository/branches/" + (encodeURI(branchId)), (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    ProjectRepository.prototype.listTags = function(projectId, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::listTags()");
      return this.get("projects/" + (Utils.parseProjectId(projectId)) + "/repository/tags", (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    ProjectRepository.prototype.listCommits = function(projectId, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::listCommits()");
      return this.get("projects/" + (Utils.parseProjectId(projectId)) + "/repository/commits", (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    ProjectRepository.prototype.showCommit = function(projectId, commitId, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::commit()");
      return this.get("projects/" + (Utils.parseProjectId(projectId)) + "/repository/branches/" + (parseInt(commitId)), (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    ProjectRepository.prototype.diffCommit = function(projectId, sha, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::diffCommit()");
      return this.get("projects/" + (Utils.parseProjectId(projectId)) + "/repository/branches/" + sha, (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
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
      return this.get("projects/" + (Utils.parseProjectId(projectId)) + "/repository/tree", params, (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
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
        return this.get("projects/" + (Utils.parseProjectId(params.projectId)) + "/repository/files", params, (function(_this) {
          return function(data) {
            if (fn) {
              return fn(data);
            }
          };
        })(this));
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
      return this.post("projects/" + (Utils.parseProjectId(params.projectId)) + "/repository/files", params, (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    ProjectRepository.prototype.updateFile = function(params, fn) {
      if (params == null) {
        params = {};
      }
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::updateFile()", params);
      return this.put("projects/" + (Utils.parseProjectId(params.projectId)) + "/repository/files", params, (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    return ProjectRepository;

  })(BaseModel);

  module.exports = function(client) {
    return new ProjectRepository(client);
  };

}).call(this);
