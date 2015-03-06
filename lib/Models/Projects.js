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
      this.listTags = bind(this.listTags, this);
      this.listCommits = bind(this.listCommits, this);
      this.listMembers = bind(this.listMembers, this);
      this.editMember = bind(this.editMember, this);
      this.addMember = bind(this.addMember, this);
      this.create = bind(this.create, this);
      this.show = bind(this.show, this);
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
      return this.merge_requests = this.load('ProjectMergeRequests');
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

    return Projects;

  })(BaseModel);

  module.exports = function(client) {
    return new Projects(client);
  };

}).call(this);
