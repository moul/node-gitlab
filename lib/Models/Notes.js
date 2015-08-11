(function() {
  var BaseModel, Notes, Utils,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  BaseModel = require('../BaseModel');

  Utils = require('../Utils');

  Notes = (function(superClass) {
    extend(Notes, superClass);

    function Notes() {
      this.create = bind(this.create, this);
      return Notes.__super__.constructor.apply(this, arguments);
    }

    Notes.prototype.create = function(projectId, issueId, params, fn) {
      if (params == null) {
        params = {};
      }
      if (fn == null) {
        fn = null;
      }
      this.debug("Notes::create()");
      return this.post("projects/" + (Utils.parseProjectId(projectId)) + "/issues/" + (parseInt(issueId)) + "/notes", params, function(data) {
        if (fn) {
          return fn(data);
        }
      });
    };

    return Notes;

  })(BaseModel);

  module.exports = function(client) {
    return new Notes(client);
  };

}).call(this);
