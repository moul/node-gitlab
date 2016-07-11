(function() {
  var chai, expect, sinon, sinonChai;

  chai = require('chai');

  expect = chai.expect;

  sinon = require('sinon');

  sinonChai = require('sinon-chai');

  chai.use(sinonChai);

  describe("ProjectRepository", function() {
    var gitlab, projects, repository;
    gitlab = null;
    projects = null;
    repository = null;
    before(function() {
      gitlab = (require('../'))({
        url: 'test',
        token: 'test'
      });
      projects = gitlab.projects;
      return repository = projects.repository;
    });
    beforeEach(function() {});
    describe("listBranches()", function() {
      return it("should use GET verb", function() {
        var getStub;
        getStub = sinon.stub(repository, "get");
        repository.listBranches(1);
        getStub.restore();
        return expect(getStub).to.have.been.called;
      });
    });
    describe("listCommits()", function() {
      return it("should use GET verb", function() {
        var getStub;
        getStub = sinon.stub(repository, "get");
        repository.listCommits(1);
        getStub.restore();
        return expect(getStub).to.have.been.called;
      });
    });
    describe("addTag()", function() {
      return it("should use POST verb", function() {
        var opts, postStub;
        postStub = sinon.stub(repository, "post");
        opts = {
          id: 1,
          tag_name: "v1.0.0",
          ref: "2695effb5807a22ff3d138d593fd856244e155e7",
          message: "Annotated message",
          release_description: "Release description"
        };
        repository.addTag(opts);
        postStub.restore();
        return expect(postStub).to.have.been.called;
      });
    });
    describe("listTags()", function() {
      return it("should use GET verb", function() {
        var getStub;
        getStub = sinon.stub(repository, "get");
        repository.listTags(1);
        getStub.restore();
        return expect(getStub).to.have.been.called;
      });
    });
    describe("listTree()", function() {
      return it("should use GET verb", function() {
        var getStub;
        getStub = sinon.stub(repository, "get");
        repository.listTree(1);
        getStub.restore();
        return expect(getStub).to.have.been.called;
      });
    });
    return describe("showFile()", function() {
      return it("should use GET verb", function() {
        var getStub;
        getStub = sinon.stub(repository, "get");
        repository.showFile(1, {
          file_path: "test",
          ref: "test"
        });
        getStub.restore();
        return expect(getStub).to.have.been.called;
      });
    });
  });

}).call(this);
