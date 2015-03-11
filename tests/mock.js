(function() {
  var Mock,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Mock = (function() {
    function Mock() {
      this.beforeEach = bind(this.beforeEach, this);
      this.update_path = bind(this.update_path, this);
      this.setup = bind(this.setup, this);
      var project;
      this.path = '';
      this.projects = [];
      project = {
        id: 13,
        description: '',
        default_branch: 'master',
        "public": false,
        visibility_level: 0,
        ssh_url_to_repo: 'git@demo.gitlab.com:sandbox/afro.git',
        http_url_to_repo: 'http://demo.gitlab.com/sandbox/afro.git',
        web_url: 'http://demo.gitlab.com/sandbox/afro',
        owner: {
          id: 8,
          name: 'Sandbox',
          created_at: '2013-08-01T16:44:17.000Z'
        },
        name: 'Afro',
        name_with_namespace: 'Sandbox / Afro',
        path: 'afro',
        path_with_namespace: 'sandbox/afro',
        issues_enabled: true,
        merge_requests_enabled: true,
        wall_enabled: false,
        wiki_enabled: true,
        snippets_enabled: false,
        created_at: '2013-11-14T17:45:19.000Z',
        last_activity_at: '2014-01-16T15:32:07.000Z',
        namespace: {
          id: 8,
          name: 'Sandbox',
          path: 'sandbox',
          owner_id: 1,
          created_at: '2013-08-01T16:44:17.000Z',
          updated_at: '2013-08-01T16:44:17.000Z',
          description: ''
        }
      };
      this.projects.push(project);
    }

    Mock.prototype.setup = function(gitlab) {
      before((function(_this) {
        return function() {
          return gitlab.slumber = function(path) {
            return _this.update_path(path);
          };
        };
      })(this));
      return beforeEach((function(_this) {
        return function() {
          return _this.beforeEach();
        };
      })(this));
    };

    Mock.prototype.update_path = function(path1) {
      this.path = path1;
      return this;
    };

    Mock.prototype.defaults = {
      get: function(opts, cb) {
        if (cb) {
          return cb(null, {}, [{}]);
        }
      },
      "delete": function(opts, cb) {
        if (cb) {
          return cb(null, {}, [{}]);
        }
      },
      post: function(opts, cb) {
        if (cb) {
          return cb(null, {}, [{}]);
        }
      },
      put: function(opts, cb) {
        if (cb) {
          return cb(null, {}, [{}]);
        }
      },
      patch: function(opts, cb) {
        if (cb) {
          return cb(null, {}, [{}]);
        }
      }
    };

    Mock.prototype.beforeEach = function() {
      var i, len, method, ref, results;
      ref = ['get', 'delete', 'post', 'put', 'patch'];
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        method = ref[i];
        results.push(this[method] = this.defaults[method]);
      }
      return results;
    };

    return Mock;

  })();

  module.exports = new Mock();

}).call(this);
