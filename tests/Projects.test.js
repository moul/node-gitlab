(function() {
  var chai, expect, sinon, sinonChai;

  chai = require('chai');

  expect = chai.expect;

  sinon = require('sinon');

  sinonChai = require('sinon-chai');

  chai.use(sinonChai);

  describe("Projects", function() {
    var gitlab, projects;
    gitlab = null;
    projects = null;
    before(function() {
      gitlab = (require('../'))({
        url: 'test',
        token: 'test'
      });
      return projects = gitlab.projects;
    });
    beforeEach(function() {});
    describe("show()", function() {
      it("should use GET verb", function() {
        var getStub;
        getStub = sinon.stub(projects, "get");
        projects.show(1);
        getStub.restore();
        return expect(getStub).to.have.been.called;
      });
      it("should pass Numeric projectIDs to Utils.parseProjectId", function() {
        var getStub;
        getStub = sinon.stub(projects, "get");
        projects.show(1);
        getStub.restore();
        return expect(getStub).to.have.been.calledWith("projects/1");
      });
      return it("should pass Namespaced projectIDs to Utils.parseProjectId", function() {
        var getStub;
        getStub = sinon.stub(projects, "get");
        projects.show("abc/def");
        getStub.restore();
        return expect(getStub).to.have.been.calledWith("projects/abc%2Fdef");
      });
    });
    describe("all()", function() {
      var arrayOf1, arrayOf100, arrayOf101, arrayOf99;
      arrayOf101 = [];
      arrayOf100 = [];
      arrayOf99 = [];
      arrayOf1 = [];
      before(function() {
        var i, _i, _results;
        _results = [];
        for (i = _i = 0; _i <= 102; i = ++_i) {
          if (i < 1) {
            arrayOf1.push({});
          }
          if (i < 99) {
            arrayOf99.push({});
          }
          if (i < 100) {
            arrayOf100.push({});
          }
          if (i < 101) {
            _results.push(arrayOf101.push({}));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      });
      it("should use GET verb", function() {
        var getStub;
        getStub = sinon.stub(projects, "get");
        projects.all();
        getStub.restore();
        return expect(getStub).to.have.been.called;
      });
      return it("should recurse if more than 100 records are returned", function() {
        var getStub;
        getStub = sinon.stub(projects, "get", function(a, b, c) {
          if (getStub.callCount < 3) {
            return c(null, arrayOf100);
          } else {
            return c(null, arrayOf99);
          }
        });
        projects.all();
        return expect(getStub).to.have.been.calledThrice;
      });
    });
    return describe("create()", function() {
      return it("should use POST verb", function() {
        var postStub;
        postStub = sinon.stub(projects, "post");
        projects.create({});
        postStub.restore();
        return expect(postStub).to.have.been.called;
      });
    });
  });

}).call(this);
