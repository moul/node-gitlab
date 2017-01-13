(function() {
  var BaseModel, Projects, Utils,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  BaseModel = require('../BaseModel');

  Utils = require('../Utils');

  Projects = (function(superClass) {
    extend(Projects, superClass);

    function Projects() {
      this.removeTrigger = bind(this.removeTrigger, this);
      this.createTrigger = bind(this.createTrigger, this);
      this.showTrigger = bind(this.showTrigger, this);
      this.listTriggers = bind(this.listTriggers, this);
      this.search = bind(this.search, this);
      this.share = bind(this.share, this);
      this.fork = bind(this.fork, this);
      this.remove = bind(this.remove, this);
      this.listTags = bind(this.listTags, this);
      this.listCommits = bind(this.listCommits, this);
      this.listMembers = bind(this.listMembers, this);
      this.editMember = bind(this.editMember, this);
      this.addMember = bind(this.addMember, this);
      this.edit = bind(this.edit, this);
      this.create_for_user = bind(this.create_for_user, this);
      this.create = bind(this.create, this);
      this.show = bind(this.show, this);
      this.allAdmin = bind(this.allAdmin, this);
      this.all = bind(this.all, this);
      this.init = bind(this.init, this);
      return Projects.__super__.constructor.apply(this, arguments);
    }

    Projects.prototype.init = function() {
      this.members = this.load('ProjectMembers');
      this.hooks = this.load('ProjectHooks');
      this.issues = this.load('ProjectIssues');
      this.labels = this.load('ProjectLabels');
      this.repository = this.load('ProjectRepository');
      this.milestones = this.load('ProjectMilestones');
      this.deploy_keys = this.load('ProjectDeployKeys');
      this.merge_requests = this.load('ProjectMergeRequests');
      this.services = this.load('ProjectServices');
      this.builds = this.load('ProjectBuilds');
      this.pipelines = this.load('Pipelines');
      return this.runners = this.load('Runners');
    };

    Projects.prototype.all = function(params, fn) {
      var cb, data;
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
      this.debug("Projects::all()");
      if (params.page == null) {
        params.page = 1;
      }
      if (params.per_page == null) {
        params.per_page = 100;
      }
      data = [];
      cb = (function(_this) {
        return function(err, retData) {
          if (err) {
            if (fn) {
              return fn(retData || data);
            }
          } else if (retData.length === params.per_page) {
            _this.debug("Recurse Projects::all()");
            data = data.concat(retData);
            params.page++;
            return _this.get("projects", params, cb);
          } else {
            data = data.concat(retData);
            if (fn) {
              return fn(data);
            }
          }
        };
      })(this);
      return this.get("projects", params, cb);
    };

    Projects.prototype.allAdmin = function(params, fn) {
      var cb, data;
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
      this.debug("Projects::allAdmin()");
      if (params.page == null) {
        params.page = 1;
      }
      if (params.per_page == null) {
        params.per_page = 100;
      }
      data = [];
      cb = (function(_this) {
        return function(err, retData) {
          if (err) {
            if (fn) {
              return fn(retData || data);
            }
          } else if (retData.length === params.per_page) {
            _this.debug("Recurse Projects::allAdmin()");
            data = data.concat(retData);
            params.page++;
            return _this.get("projects/all", params, cb);
          } else {
            data = data.concat(retData);
            if (fn) {
              return fn(data);
            }
          }
        };
      })(this);
      return this.get("projects/all", params, cb);
    };

    Projects.prototype.show = function(projectId, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::show()");
      return this.get("projects/" + (Utils.parseProjectId(projectId)), (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    Projects.prototype.create = function(params, fn) {
      if (params == null) {
        params = {};
      }
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::create()");
      return this.post("projects", params, function(data) {
        if (fn) {
          return fn(data);
        }
      });
    };

    Projects.prototype.create_for_user = function(params, fn) {
      if (params == null) {
        params = {};
      }
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::create_for_user()");
      return this.post("projects/user/" + params.user_id, params, function(data) {
        if (fn) {
          return fn(data);
        }
      });
    };

    Projects.prototype.edit = function(projectId, params, fn) {
      if (params == null) {
        params = {};
      }
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::edit()");
      return this.put("projects/" + (Utils.parseProjectId(projectId)), params, function(data) {
        if (fn) {
          return fn(data);
        }
      });
    };

    Projects.prototype.addMember = function(params, fn) {
      if (params == null) {
        params = {};
      }
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::addMember()");
      return this.post("projects/" + params.id + "/members", params, function(data) {
        if (fn) {
          return fn(data);
        }
      });
    };

    Projects.prototype.editMember = function(params, fn) {
      if (params == null) {
        params = {};
      }
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::editMember()");
      return this.put("projects/" + params.id + "/members/" + params.user_id, params, function(data) {
        if (fn) {
          return fn(data);
        }
      });
    };

    Projects.prototype.listMembers = function(params, fn) {
      if (params == null) {
        params = {};
      }
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::listMembers()");
      return this.get("projects/" + params.id + "/members", function(data) {
        if (fn) {
          return fn(data);
        }
      });
    };

    Projects.prototype.listCommits = function(params, fn) {
      if (params == null) {
        params = {};
      }
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::listCommits()");
      return this.get("projects/" + params.id + "/repository/commits", params, (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    Projects.prototype.listTags = function(params, fn) {
      if (params == null) {
        params = {};
      }
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::listTags()");
      return this.get("projects/" + params.id + "/repository/tags", (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    Projects.prototype.remove = function(projectId, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::remove()");
      return this["delete"]("projects/" + (Utils.parseProjectId(projectId)), (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    Projects.prototype.fork = function(params, fn) {
      if (params == null) {
        params = {};
      }
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::fork()");
      return this.post("projects/fork/" + params.id, params, function(data) {
        if (fn) {
          return fn(data);
        }
      });
    };

    Projects.prototype.share = function(params, fn) {
      if (params == null) {
        params = {};
      }
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::share()");
      return this.post("projects/" + (Utils.parseProjectId(params.projectId)) + "/share", params, function(data) {
        if (fn) {
          return fn(data);
        }
      });
    };

    Projects.prototype.search = function(projectName, params, fn) {
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
      this.debug("Projects::search()");
      return this.get("projects/search/" + projectName, params, (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    Projects.prototype.listTriggers = function(projectId, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::listTriggers()");
      return this.get("projects/" + (Utils.parseProjectId(projectId)) + "/triggers", (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    Projects.prototype.showTrigger = function(projectId, token, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::showTrigger()");
      return this.get("projects/" + (Utils.parseProjectId(projectId)) + "/triggers/" + token, (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    Projects.prototype.createTrigger = function(params, fn) {
      if (params == null) {
        params = {};
      }
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::createTrigger()");
      return this.post("projects/" + (Utils.parseProjectId(params.projectId)) + "/triggers", params, function(data) {
        if (fn) {
          return fn(data);
        }
      });
    };

    Projects.prototype.removeTrigger = function(projectId, token, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::removeTrigger()");
      return this["delete"]("projects/" + (Utils.parseProjectId(projectId)) + "/triggers/" + token, (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    return Projects;

  })(BaseModel);

  module.exports = function(client) {
    return new Projects(client);
  };

}).call(this);
