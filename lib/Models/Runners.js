(function() {
  var BaseModel, Runners, Utils,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  BaseModel = require('../BaseModel');

  Utils = require('../Utils');

  Runners = (function(superClass) {
    extend(Runners, superClass);

    function Runners() {
      this.disable = bind(this.disable, this);
      this.enable = bind(this.enable, this);
      this.remove = bind(this.remove, this);
      this.update = bind(this.update, this);
      this.show = bind(this.show, this);
      this.all = bind(this.all, this);
      return Runners.__super__.constructor.apply(this, arguments);
    }

    Runners.prototype.all = function(projectId, params, fn) {
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
      this.debug("Projects::Runners::all()");
      if (projectId != null) {
        return this.get("projects/" + (Utils.parseProjectId(projectId)) + "/runners", params, (function(_this) {
          return function(data) {
            if (fn) {
              return fn(data);
            }
          };
        })(this));
      } else {
        return this.get("runners", params, (function(_this) {
          return function(data) {
            if (fn) {
              return fn(data);
            }
          };
        })(this));
      }
    };

    Runners.prototype.show = function(runnerId, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::Runners::show()");
      return this.get("runners/" + (parseInt(runnerId)), (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    Runners.prototype.update = function(runnerId, attributes, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::Runners::update");
      return this.put("runners/" + (parseInt(runnerId)), attributes, (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    Runners.prototype.remove = function(runnerId, projectId, enable, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::Runners::runners()");
      return this["delete"]("runners/" + (parseInt(runnerId)), (function(_this) {
        return function(data) {
          if (fn) {
            return fn(data);
          }
        };
      })(this));
    };

    Runners.prototype.enable = function(projectId, runnerId, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::Runners::enable()");
      ({
        attributes: {
          runner_id: parseInt(runnerId)
        }
      });
      return this.post("projects/" + (Utils.parseProjectId(projectId)) + "/runners", attributes, function(data) {
        if (fn) {
          return fn(data);
        }
      });
    };

    Runners.prototype.disable = function(projectId, runnerId, fn) {
      if (fn == null) {
        fn = null;
      }
      this.debug("Projects::Runners::disable()");
      return this["delete"]("projects/" + (Utils.parseProjectId(projectId)) + "/runners/" + (parseInt(runnerId)), function(data) {
        if (fn) {
          return fn(data);
        }
      });
    };

    return Runners;

  })(BaseModel);

  module.exports = function(client) {
    return new Runners(client);
  };

}).call(this);
