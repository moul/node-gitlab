(function() {
  var BaseModel, Issues,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  BaseModel = require('../BaseModel');

  Issues = (function(superClass) {
    extend(Issues, superClass);

    function Issues() {
      this.unsubscribe = bind(this.unsubscribe, this);
      this.subscribe = bind(this.subscribe, this);
      this.remove = bind(this.remove, this);
      this.edit = bind(this.edit, this);
      this.create = bind(this.create, this);
      this.show = bind(this.show, this);
      this.all = bind(this.all, this);
      return Issues.__super__.constructor.apply(this, arguments);
    }

    Issues.prototype.all = function(params, fn) {
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
      this.debug("Issues::all()");
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
          return function(retData) {
            if (retData.length === params.per_page) {
              _this.debug("Recurse Issues::all()");
              data = data.concat(retData);
              params.page++;
              return _this.get("issues", params, cb);
            } else {
              data = data.concat(retData);
              if (fn) {
                return fn(data);
              }
            }
          };
        })(this);
        return this.get("issues", params, cb);
      }).bind(this)();
    };

    Issues.prototype.show = function(projectId, issueId, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Issues::show()");
      if (projectId.toString().indexOf("/") !== -1) {
        projectId = encodeURIComponent(projectId);
      } else {
        projectId = parseInt(projectId);
      }
      if (issueId.toString().indexOf("/") !== -1) {
        issueId = encodeURIComponent(issueId);
      } else {
        issueId = parseInt(issueId);
      }
      return this.get("projects/" + projectId + "/issues/" + issueId, (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    Issues.prototype.create = function(projectId, params, fn) {
      if (params == null) {
        params = {};
      }
      if (fn == null) {
        fn = null;
      }
      this.debug("Issues::create()");
      if (projectId.toString().indexOf("/") !== -1) {
        projectId = encodeURIComponent(projectId);
      } else {
        projectId = parseInt(projectId);
      }
      return this.post("projects/" + projectId + "/issues", params, function(data) {
        if (fn) {
          return fn(data);
        }
      });
    };

    Issues.prototype.edit = function(projectId, issueId, params, fn) {
      if (params == null) {
        params = {};
      }
      if (fn == null) {
        fn = null;
      }
      this.debug("Issues::edit()");
      if (projectId.toString().indexOf("/") !== -1) {
        projectId = encodeURIComponent(projectId);
      } else {
        projectId = parseInt(projectId);
      }
      if (issueId.toString().indexOf("/") !== -1) {
        issueId = encodeURIComponent(issueId);
      } else {
        issueId = parseInt(issueId);
      }
      return this.put("projects/" + projectId + "/issues/" + issueId, params, function(data) {
        if (fn) {
          return fn(data);
        }
      });
    };

    Issues.prototype.remove = function(projectId, issueId, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Issues::remove()");
      if (projectId.toString().indexOf("/") !== -1) {
        projectId = encodeURIComponent(projectId);
      } else {
        projectId = parseInt(projectId);
      }
      if (issueId.toString().indexOf("/") !== -1) {
        issueId = encodeURIComponent(issueId);
      } else {
        issueId = parseInt(issueId);
      }
      return this["delete"]("projects/" + projectId + "/issues/" + issueId, function(data) {
        if (fn) {
          return fn(data);
        }
      });
    };

    Issues.prototype.subscribe = function(projectId, issueId, params, fn) {
      if (params == null) {
        params = {};
      }
      if (fn == null) {
        fn = null;
      }
      this.debug("Issues::subscribe()");
      if (projectId.toString().indexOf("/") !== -1) {
        projectId = encodeURIComponent(projectId);
      } else {
        projectId = parseInt(projectId);
      }
      if (issueId.toString().indexOf("/") !== -1) {
        issueId = encodeURIComponent(issueId);
      } else {
        issueId = parseInt(issueId);
      }
      return this.post("projects/" + projectId + "/issues/" + issueId + "/subscription", function(data) {
        if (fn) {
          return fn(data);
        }
      });
    };

    Issues.prototype.unsubscribe = function(projectId, issueId, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Issues::unsubscribe()");
      if (projectId.toString().indexOf("/") !== -1) {
        projectId = encodeURIComponent(projectId);
      } else {
        projectId = parseInt(projectId);
      }
      if (issueId.toString().indexOf("/") !== -1) {
        issueId = encodeURIComponent(issueId);
      } else {
        issueId = parseInt(issueId);
      }
      return this["delete"]("projects/" + projectId + "/issues/" + issueId + "/subscription", function(data) {
        if (fn) {
          return fn(data);
        }
      });
    };

    return Issues;

  })(BaseModel);

  module.exports = function(client) {
    return new Issues(client);
  };

}).call(this);
