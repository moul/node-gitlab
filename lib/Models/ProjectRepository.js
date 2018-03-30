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
      this.compare = bind(this.compare, this);
      this.updateFile = bind(this.updateFile, this);
      this.createFile = bind(this.createFile, this);
      this.showFile = bind(this.showFile, this);
      this.listTree = bind(this.listTree, this);
      this.diffCommit = bind(this.diffCommit, this);
      this.showCommit = bind(this.showCommit, this);
      this.listCommits = bind(this.listCommits, this);
      this.listTags = bind(this.listTags, this);
      this.showTag = bind(this.showTag, this);
      this.deleteTag = bind(this.deleteTag, this);
      this.addTag = bind(this.addTag, this);
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

    ProjectRepository.prototype.protectBranch = function(projectId, branchId, params, fn) {
      if (params == null) {
        params = {};
      }
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::protectBranch()");
      return this.put("projects/" + (Utils.parseProjectId(projectId)) + "/repository/branches/" + (encodeURI(branchId)) + "/protect", params, (function(_this) {
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

    ProjectRepository.prototype.addTag = function(params, fn) {
      if (params == null) {
        params = {};
      }
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::addTag()");
      return this.post("projects/" + (Utils.parseProjectId(params.id)) + "/repository/tags", params, (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    ProjectRepository.prototype.deleteTag = function(projectId, tagName, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::deleteTag()");
      return this["delete"]("projects/" + (Utils.parseProjectId(projectId)) + "/repository/tags/" + (encodeURI(tagName)), (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    ProjectRepository.prototype.showTag = function(projectId, tagName, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::showTag()");
      return this.get("projects/" + (Utils.parseProjectId(projectId)) + "/repository/tags/" + (encodeURI(tagName)), (function(_this) {
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

    ProjectRepository.prototype.showCommit = function(projectId, sha, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::commit()");
      return this.get("projects/" + (Utils.parseProjectId(projectId)) + "/repository/commits/" + sha, (function(_this) {
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
      return this.get("projects/" + (Utils.parseProjectId(projectId)) + "/repository/commits/" + sha + "/diff", (function(_this) {
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
      } else if (params.file_path && params.file_id) {
        return this.get(("projects/" + (Utils.parseProjectId(params.projectId)) + "/repository/raw_blobs/") + params.file_id, params, (function(_this) {
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

    ProjectRepository.prototype.compare = function(params, fn) {
      if (params == null) {
        params = {};
      }
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::compare()", params);
      return this.get("projects/" + (Utils.parseProjectId(params.projectId)) + "/repository/compare", params, (function(_this) {
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
