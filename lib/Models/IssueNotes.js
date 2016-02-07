(function() {
  var BaseModel, IssueNotes, Utils,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  BaseModel = require('../BaseModel');

  Utils = require('../Utils');

  IssueNotes = (function(superClass) {
    extend(IssueNotes, superClass);

    function IssueNotes() {
      this.all = bind(this.all, this);
      return IssueNotes.__super__.constructor.apply(this, arguments);
    }

    IssueNotes.prototype.all = function(projectId, issueId, params, fn) {
      if (params == null) {
        params = {};
      }
      if (fn == null) {
        fn = null;
      }
      this.debug("IssueNotes::notes()");
      if ('function' === typeof params) {
        fn = params;
        params = {};
      }
      if (params.page == null) {
        params.page = 1;
      }
      if (params.per_page == null) {
        params.per_page = 100;
      }
      return Utils.multiPageHandler(params, fn, (function(_this) {
        return function(nextParams, cb) {
          _this.debug("Recurse IssueNotes::all()");
          return _this.get("projects/" + (Utils.parseProjectId(projectId)) + "/issues/" + (parseInt(issueId)) + "/notes", nextParams, cb);
        };
      })(this));
    };

    return IssueNotes;

  })(BaseModel);

  module.exports = function(client) {
    return new IssueNotes(client);
  };

}).call(this);
