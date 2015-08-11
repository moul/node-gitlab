(function() {
  var BaseModel, Users,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  BaseModel = require('../BaseModel');

  Users = (function(superClass) {
    extend(Users, superClass);

    function Users() {
      this.search = bind(this.search, this);
      this.session = bind(this.session, this);
      this.create = bind(this.create, this);
      this.show = bind(this.show, this);
      this.current = bind(this.current, this);
      this.all = bind(this.all, this);
      this.init = bind(this.init, this);
      return Users.__super__.constructor.apply(this, arguments);
    }

    Users.prototype.init = function() {
      return this.keys = this.load('UserKeys');
    };

    Users.prototype.all = function(params, fn) {
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
      this.debug("Users::all()");
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
            _this.debug("Recurse Users::all()");
            data = data.concat(retData);
            params.page++;
            return _this.get("users", params, cb);
          } else {
            data = data.concat(retData);
            if (fn) {
              return fn(data);
            }
          }
        };
      })(this);
      return this.get("users", params, cb);
    };

    Users.prototype.current = function(fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Users::current()");
      return this.get("user", function(data) {
        if (fn) {
          return fn(data);
        }
      });
    };

    Users.prototype.show = function(userId, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Users::show()");
      return this.get("users/" + (parseInt(userId)), (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    Users.prototype.create = function(params, fn) {
      if (params == null) {
        params = {};
      }
      if (fn == null) {
        fn = null;
      }
      this.debug("Users::create()", params);
      return this.post("users", params, function(data) {
        if (fn) {
          return fn(data);
        }
      });
    };

    Users.prototype.session = function(email, password, fn) {
      var params;
      if (fn == null) {
        fn = null;
      }
      this.debug("Users::session()");
      params = {
        email: email,
        password: password
      };
      return this.post("session", params, function(data) {
        if (fn) {
          return fn(data);
        }
      });
    };

    Users.prototype.search = function(emailOrUsername, fn) {
      var params;
      if (fn == null) {
        fn = null;
      }
      this.debug("Users::search(" + emailOrUsername + ")");
      params = {
        search: emailOrUsername
      };
      return this.get("users", params, function(data) {
        if (fn) {
          return fn(data);
        }
      });
    };

    return Users;

  })(BaseModel);

  module.exports = function(client) {
    return new Users(client);
  };

}).call(this);
