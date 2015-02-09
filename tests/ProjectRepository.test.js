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
