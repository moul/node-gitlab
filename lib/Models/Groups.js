(function() {
  var BaseModel, Groups,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  BaseModel = require('../BaseModel');

  Groups = (function(superClass) {
    extend(Groups, superClass);

    function Groups() {
      this.search = bind(this.search, this);
      this.deleteGroup = bind(this.deleteGroup, this);
      this.addProject = bind(this.addProject, this);
      this.create = bind(this.create, this);
      this.removeMember = bind(this.removeMember, this);
      this.editMember = bind(this.editMember, this);
      this.addMember = bind(this.addMember, this);
      this.listMembers = bind(this.listMembers, this);
      this.listProjects = bind(this.listProjects, this);
      this.show = bind(this.show, this);
      this.all = bind(this.all, this);
      this.init = bind(this.init, this);
      return Groups.__super__.constructor.apply(this, arguments);
    }

    Groups.prototype.init = function() {
      return this.access_levels = {
        GUEST: 10,
        REPORTER: 20,
        DEVELOPER: 30,
        MASTER: 40,
        OWNER: 50
      };
    };

    Groups.prototype.all = function(params, fn) {
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
      this.debug("Groups::all()");
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
            _this.debug("Recurse Groups::all()");
            data = data.concat(retData);
            params.page++;
            return _this.get("groups", params, cb);
          } else {
            data = data.concat(retData);
            if (fn) {
              return fn(data);
            }
          }
        };
      })(this);
      return this.get("groups", params, cb);
    };

    Groups.prototype.show = function(groupId, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Groups::show()");
      return this.get("groups/" + (parseInt(groupId)), (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    Groups.prototype.listProjects = function(groupId, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Groups::listProjects()");
      return this.get("groups/" + (parseInt(groupId)), (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data.projects);
          }
        };
      })(this));
    };

    Groups.prototype.listMembers = function(groupId, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Groups::listMembers()");
      return this.get("groups/" + (parseInt(groupId)) + "/members", (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    Groups.prototype.addMember = function(groupId, userId, accessLevel, fn) {
      var checkAccessLevel, params;
      if (fn == null) {
        fn = null;
      }
      this.debug("addMember(" + groupId + ", " + userId + ", " + accessLevel + ")");
      checkAccessLevel = (function(_this) {
        return function() {
          var access_level, k, ref;
          ref = _this.access_levels;
          for (k in ref) {
            access_level = ref[k];
            if (accessLevel === access_level) {
              return true;
            }
          }
          return false;
        };
      })(this);
      if (!checkAccessLevel()) {
        throw "`accessLevel` must be one of " + (JSON.stringify(this.access_levels));
      }
      params = {
        user_id: userId,
        access_level: accessLevel
      };
      return this.post("groups/" + (parseInt(groupId)) + "/members", params, function(data) {
        if (fn) {
          return fn(data);
        }
      });
    };

    Groups.prototype.editMember = function(groupId, userId, accessLevel, fn) {
      var checkAccessLevel, params;
      if (fn == null) {
        fn = null;
      }
      this.debug("Groups::editMember(" + groupId + ", " + userId + ", " + accessLevel + ")");
      checkAccessLevel = (function(_this) {
        return function() {
          var access_level, k, ref;
          ref = _this.access_levels;
          for (k in ref) {
            access_level = ref[k];
            if (accessLevel === access_level) {
              return true;
            }
          }
          return false;
        };
      })(this);
      if (!checkAccessLevel()) {
        throw "`accessLevel` must be one of " + (JSON.stringify(this.access_levels));
      }
      params = {
        access_level: accessLevel
      };
      return this.put("groups/" + (parseInt(groupId)) + "/members/" + (parseInt(userId)), params, function(data) {
        if (fn) {
          return fn(data);
        }
      });
    };

    Groups.prototype.removeMember = function(groupId, userId, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Groups::removeMember(" + groupId + ", " + userId + ")");
      return this["delete"]("groups/" + (parseInt(groupId)) + "/members/" + (parseInt(userId)), function(data) {
        if (fn) {
          return fn(data);
        }
      });
    };

    Groups.prototype.create = function(params, fn) {
      if (params == null) {
        params = {};
      }
      if (fn == null) {
        fn = null;
      }
      this.debug("Groups::create()");
      return this.post("groups", params, function(data) {
        if (fn) {
          return fn(data);
        }
      });
    };

    Groups.prototype.addProject = function(groupId, projectId, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Groups::addProject(" + groupId + ", " + projectId + ")");
      return this.post("groups/" + (parseInt(groupId)) + "/projects/" + (parseInt(projectId)), null, function(data) {
        if (fn) {
          return fn(data);
        }
      });
    };

    Groups.prototype.deleteGroup = function(groupId, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Groups::delete(" + groupId + ")");
      return this["delete"]("groups/" + (parseInt(groupId)), function(data) {
        if (fn) {
          return fn(data);
        }
      });
    };

    Groups.prototype.search = function(nameOrPath, fn) {
      var params;
      if (fn == null) {
        fn = null;
      }
      this.debug("Groups::search(" + nameOrPath + ")");
      params = {
        search: nameOrPath
      };
      return this.get("groups", params, function(data) {
        if (fn) {
          return fn(data);
        }
      });
    };

    return Groups;

  })(BaseModel);

  module.exports = function(client) {
    return new Groups(client);
  };

}).call(this);
