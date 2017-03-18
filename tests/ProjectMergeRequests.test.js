(function() {
  var chai, expect, sinon, sinonChai;

  chai = require('chai');

  expect = chai.expect;

  sinon = require('sinon');

  sinonChai = require('sinon-chai');

  chai.use(sinonChai);

  describe("ProjectMergeRequests", function() {
    var gitlab, mergeRequests, projects;
    gitlab = null;
    projects = null;
    mergeRequests = null;
    before(function() {
      gitlab = (require('../'))({
        url: 'test',
        token: 'test'
      });
      projects = gitlab.projects;
      return mergeRequests = projects.merge_requests;
    });
    describe("changes()", function() {
      it("should use GET verb", function() {
        var getStub;
        getStub = sinon.stub(mergeRequests, "get");
        mergeRequests.changes(1, 100);
        getStub.restore();
        return expect(getStub).to.have.been.called;
      });
      return it("should pass Numeric projectIDs, mergeRequestId and compile url", function() {
        var getStub, url;
        getStub = sinon.stub(mergeRequests, "get");
        mergeRequests.changes(1, 100);
        getStub.restore();
        url = "projects/1/merge_request/100/changes";
        return expect(getStub).to.have.been.calledWith(url);
      });
    });
    describe("versions()", function() {
      it("should use GET verb", function() {
        var getStub;
        getStub = sinon.stub(mergeRequests, "get");
        mergeRequests.versions(1, 100);
        getStub.restore();
        return expect(getStub).to.have.been.called;
      });
      return it("should pass Numeric projectIDs, mergeRequestId and compile url", function() {
        var getStub, url;
        getStub = sinon.stub(mergeRequests, "get");
        mergeRequests.versions(1, 100);
        getStub.restore();
        url = "projects/1/merge_requests/100/versions";
        return expect(getStub).to.have.been.calledWith(url);
      });
    });
    return describe("version()", function() {
      it("should use GET verb", function() {
        var getStub;
        getStub = sinon.stub(mergeRequests, "get");
        mergeRequests.version(1, 100, 200);
        getStub.restore();
        return expect(getStub).to.have.been.called;
      });
      return it("should pass Numeric projectIDs, mergeRequestId, versionId", function() {
        var getStub, url;
        getStub = sinon.stub(mergeRequests, "get");
        mergeRequests.version(1, 100, 200);
        getStub.restore();
        url = "projects/1/merge_requests/100/versions/200";
        return expect(getStub).to.have.been.calledWith(url);
      });
    });
  });

}).call(this);
