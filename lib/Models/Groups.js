(function() {
  var BaseModel, Groups,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __hasProp = {}.hasOwnProperty;

  BaseModel = require('../BaseModel');

  Groups = (function(_super) {
    __extends(Groups, _super);

    function Groups() {
      this.addMember = __bind(this.addMember, this);
      this.listMembers = __bind(this.listMembers, this);
      this.listProjects = __bind(this.listProjects, this);
      this.show = __bind(this.show, this);
      this.all = __bind(this.all, this);
      this.init = __bind(this.init, this);
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
      return this.get("groups", params, (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
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
          var access_level, k, _ref;
          _ref = _this.access_levels;
          for (k in _ref) {
            access_level = _ref[k];
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

    return Groups;

  })(BaseModel);

  module.exports = function(client) {
    return new Groups(client);
  };

}).call(this);
