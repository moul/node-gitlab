chai = require 'chai'
expect = chai.expect
sinon = require 'sinon'
proxyquire = require 'proxyquire'
sinonChai = require 'sinon-chai'

chai.use sinonChai

describe "ApiBaseHTTP", ->
  ApiBaseHTTP = null
  apibasehttp = null

  before ->
    ApiBaseHTTP = require('../lib/ApiBaseHTTP').ApiBaseHTTP

  beforeEach ->

  describe "handleOptions()", ->
    it "should interpret `url` parameter properly", ->
      apibasehttp = new ApiBaseHTTP
        base_url: "api/v3"
        url: "http://gitlab.mydomain.com/api/v3",
        token: "test"

      expect(apibasehttp.options.url).to.equal("http://gitlab.mydomain.com")
