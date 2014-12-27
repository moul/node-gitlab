chai = require 'chai'
expect = chai.expect
sinon = require 'sinon'
sinonChai = require 'sinon-chai'

chai.use sinonChai

describe "Projects", ->
  gitlab = null
  projects = null

  before ->
    gitlab = (require '../')
      url: 'test'
      token: 'test'

    projects = gitlab.projects

  beforeEach ->

  describe "show()", ->
    it "should use GET verb", ->
      getStub = sinon.stub projects, "get"

      projects.show 1

      getStub.restore()
      expect(getStub).to.have.been.called

    it "should pass Numeric projectIDs to Utils.parseProjectId", ->
      getStub = sinon.stub projects, "get"

      projects.show 1

      getStub.restore()
      expect(getStub).to.have.been.calledWith "projects/1"

    it "should pass Namespaced projectIDs to Utils.parseProjectId", ->
      getStub = sinon.stub projects, "get"

      projects.show "abc/def"

      getStub.restore()
      expect(getStub).to.have.been.calledWith "projects/abc%2Fdef"

  describe "all()", ->
    arrayOf101 = []
    arrayOf100 = []
    arrayOf99 = []
    arrayOf1 = []

    before ->
      for i in [0..102]
        if i < 1
          arrayOf1.push {}
        if i < 99
          arrayOf99.push {}
        if i < 100
          arrayOf100.push {}
        if i < 101
          arrayOf101.push {}

    it "should use GET verb", ->
      getStub = sinon.stub projects, "get"

      projects.all()

      getStub.restore()
      expect(getStub).to.have.been.called

    it "should recurse if more than 100 records are returned", ->
      getStub = sinon.stub projects, "get", (a,b,c)->
        if getStub.callCount < 3
          c null, arrayOf100
        else
          c null, arrayOf99

      projects.all()

      expect(getStub).to.have.been.calledThrice

  describe "create()", ->
    it "should use POST verb", ->
      postStub = sinon.stub projects, "post"

      projects.create {}

      postStub.restore()
      expect(postStub).to.have.been.called
