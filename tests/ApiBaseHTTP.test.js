(function() {
  var chai, expect, proxyquire, sinon, sinonChai;

  chai = require('chai');

  expect = chai.expect;

  sinon = require('sinon');

  proxyquire = require('proxyquire');

  sinonChai = require('sinon-chai');

  chai.use(sinonChai);

  describe("ApiBaseHTTP", function() {
    var ApiBaseHTTP, apibasehttp;
    ApiBaseHTTP = null;
    apibasehttp = null;
    before(function() {
      return ApiBaseHTTP = require('../lib/ApiBaseHTTP').ApiBaseHTTP;
    });
    beforeEach(function() {});
    return describe("handleOptions()", function() {
      it("should strip /api/v3 from `url` parameter if provided", function() {
        apibasehttp = new ApiBaseHTTP({
          base_url: "api/v3",
          url: "http://gitlab.mydomain.com/api/v3",
          token: "test"
        });
        return expect(apibasehttp.options.url).to.equal("http://gitlab.mydomain.com");
      });
      return it("should not strip /api/v3 from `url` parameter if not provided", function() {
        apibasehttp = new ApiBaseHTTP({
          base_url: "api/v3",
          url: "http://gitlab.mydomain.com",
          token: "test"
        });
        return expect(apibasehttp.options.url).to.equal("http://gitlab.mydomain.com");
      });
    });
  });

}).call(this);
