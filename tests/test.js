(function() {
  var Gitlab, assert, credentials, gitlab, mock, projectId, userId, validate_project;

  assert = require('assert');

  Gitlab = require('..');

  credentials = {
    host: "http://demo.gitlab.com",
    token: "Wvjy2Krpb7y8xi93owUz",
    password: "123456",
    login: "test@test.com"
  };

  gitlab = new Gitlab({
    token: credentials.token,
    url: credentials.host
  });

  projectId = 3;

  userId = 1;

  validate_project = require('./validators').validate_project;

  mock = require('./mock');

  if (process.env.TEST_NO_MOCK == null) {
    mock.setup(gitlab);
  }

  describe('User', function() {
    describe('#all()', function() {
      return it('should retrieve array of users without error', function(done) {
        return gitlab.users.all(function(result) {
          return done();
        });
      });
    });
    describe('#current()', function() {
      return it('should retrieve current user without error', function(done) {
        return gitlab.users.current(function(result) {
          return done();
        });
      });
    });
    describe('#show()', function() {
      return it('should retrieve a single user', function(done) {
        return gitlab.users.show(userId, function(result) {
          return done();
        });
      });
    });
    return describe('#session()', function() {
      return it('should retrieve a users session without error', function(done) {
        return gitlab.users.session(credentials.login, credentials.password, function(result) {
          return done();
        });
      });
    });
  });

  describe('Project', function() {
    describe('#all()', function() {
      beforeEach(function() {
        return mock.get = function(opts, cb) {
          return cb(null, {}, mock.projects);
        };
      });
      return it('should retrieve array of projects without error', function(done) {
        return gitlab.projects.all(function(projects) {
          var i, len, project;
          assert(projects.length > 0);
          for (i = 0, len = projects.length; i < len; i++) {
            project = projects[i];
            validate_project(project);
          }
          return done();
        });
      });
    });
    describe('#show()', function() {
      beforeEach(function() {
        return mock.get = function(opts, cb) {
          var project;
          project = mock.projects[0];
          project.id = parseInt(mock.path.split('/').slice(-1)[0]);
          return cb(null, {}, project);
        };
      });
      return it('should retrieve single project', function(done) {
        return gitlab.projects.show(projectId, function(project) {
          assert.equal(project.id, projectId);
          validate_project(project);
          return done();
        });
      });
    });
    describe('Members', function() {
      return describe('#listMembers()', function() {
        return describe('#list', function() {
          return it('should retrieve list of members of a project', function(done) {
            return gitlab.projects.members.list(projectId, function(result) {
              return done();
            });
          });
        });
      });
    });
    return describe('#repository', function() {
      describe('#listBranches', function() {
        return it('should retrive branches of a given project', function(done) {
          return gitlab.projects.repository.listBranches(projectId, function(result) {
            return done();
          });
        });
      });
      describe('#listCommits()', function() {
        return it('should retrieve commits of a given project', function(done) {
          return gitlab.projects.repository.listCommits(projectId, function(result) {
            return done();
          });
        });
      });
      describe('#addTag()', function() {
        return it('should add a tag to a given project', function(done) {
          var opts;
          opts = {
            id: projectId,
            tag_name: "v1.0.0",
            ref: "2695effb5807a22ff3d138d593fd856244e155e7",
            message: "Annotated message",
            release_description: "Release description"
          };
          return gitlab.projects.repository.addTag(opts, function(result) {
            return done();
          });
        });
      });
      describe('#listTags()', function() {
        return it('should retrieve tags of a given project', function(done) {
          return gitlab.projects.repository.listTags(projectId, function(result) {
            return done();
          });
        });
      });
      describe('#listTree()', function() {
        return it('should retrieve tree of a given project', function(done) {
          return gitlab.projects.repository.listTree(projectId, function(result) {
            return done();
          });
        });
      });
      return describe('#showFile()', function() {
        it('should retrieve specified file with arity=3', function(done) {
          var opts;
          opts = {
            file_path: 'README.md',
            ref: 'master'
          };
          return gitlab.projects.repository.showFile(projectId, opts, function(result) {
            return done();
          });
        });
        return it('should retrieve specified file with arity=2', function(done) {
          var opts;
          opts = {
            projectId: projectId,
            file_path: 'README.md',
            ref: 'master'
          };
          return gitlab.projects.repository.showFile(opts, function(result) {
            return done();
          });
        });
      });
    });
  });

  describe('Issue', function() {
    return describe('#all()', function() {
      return it('should retrieve array of issues created by user', function(done) {
        return gitlab.issues.all(function(result) {
          return done();
        });
      });
    });
  });

}).call(this);
