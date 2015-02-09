(function() {
  var chai, expect, sinon, sinonChai;

  chai = require('chai');

  expect = chai.expect;

  sinon = require('sinon');

  sinonChai = require('sinon-chai');

  chai.use(sinonChai);

  describe("ProjectMembers", function() {
    var gitlab, members, projects;
    gitlab = null;
    projects = null;
    members = null;
    before(function() {
      gitlab = (require('../'))({
        url: 'test',
        token: 'test'
      });
      projects = gitlab.projects;
      return members = projects.members;
    });
    beforeEach(function() {});
    describe("list()", function() {
      it("should use GET verb", function() {
        var getStub;
        getStub = sinon.stub(members, "get");
        members.list(1);
        getStub.restore();
        return expect(getStub).to.have.been.called;
      });
      it("should pass Numeric projectIDs to Utils.parseProjectId", function() {
        var getStub;
        getStub = sinon.stub(members, "get");
        members.list(1);
        getStub.restore();
        return expect(getStub).to.have.been.calledWith("projects/1/members");
      });
      return it("should pass Namespaced projectIDs to Utils.parseProjectId", function() {
        var getStub;
        getStub = sinon.stub(members, "get");
        members.list("abc/def");
        getStub.restore();
        return expect(getStub).to.have.been.calledWith("projects/abc%2Fdef/members");
      });
    });
    describe("show()", function() {
      it("should use GET verb", function() {
        var getStub;
        getStub = sinon.stub(members, "get");
        members.show(1, 2);
        getStub.restore();
        return expect(getStub).to.have.been.called;
      });
      it("should pass Numeric projectIDs to Utils.parseProjectId", function() {
        var getStub;
        getStub = sinon.stub(members, "get");
        members.show(1, 2);
        getStub.restore();
        return expect(getStub).to.have.been.calledWith("projects/1/members/2");
      });
      return it("should pass Namespaced projectIDs to Utils.parseProjectId", function() {
        var getStub;
        getStub = sinon.stub(members, "get");
        members.show("abc/def", 2);
        getStub.restore();
        return expect(getStub).to.have.been.calledWith("projects/abc%2Fdef/members/2");
      });
    });
    return describe("add()", function() {
      return it("should use POST verb", function() {
        var postStub;
        postStub = sinon.stub(members, "post");
        members.add(1, 1, 30);
        postStub.restore();
        return expect(postStub).to.have.been.called;
      });
    });
  });

}).call(this);
