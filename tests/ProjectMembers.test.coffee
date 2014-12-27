chai = require 'chai'
expect = chai.expect
sinon = require 'sinon'
sinonChai = require 'sinon-chai'

chai.use sinonChai

describe "ProjectMembers", ->
  gitlab = null
  projects = null
  members = null

  before ->
    gitlab = (require '../')
      url: 'test'
      token: 'test'

    projects = gitlab.projects
    members = projects.members

  beforeEach ->

  describe "list()", ->
    it "should use GET verb", ->
      getStub = sinon.stub members, "get"

      members.list 1

      getStub.restore()
      expect(getStub).to.have.been.called

    it "should pass Numeric projectIDs to Utils.parseProjectId", ->
      getStub = sinon.stub members, "get"

      members.list 1

      getStub.restore()
      expect(getStub).to.have.been.calledWith "projects/1/members"

    it "should pass Namespaced projectIDs to Utils.parseProjectId", ->
      getStub = sinon.stub members, "get"

      members.list "abc/def"

      getStub.restore()
      expect(getStub).to.have.been.calledWith "projects/abc%2Fdef/members"

  describe "show()", ->
    it "should use GET verb", ->
      getStub = sinon.stub members, "get"

      members.show 1, 2

      getStub.restore()
      expect(getStub).to.have.been.called

    it "should pass Numeric projectIDs to Utils.parseProjectId", ->
      getStub = sinon.stub members, "get"

      members.show 1, 2

      getStub.restore()
      expect(getStub).to.have.been.calledWith "projects/1/members/2"

    it "should pass Namespaced projectIDs to Utils.parseProjectId", ->
      getStub = sinon.stub members, "get"

      members.show "abc/def", 2

      getStub.restore()
      expect(getStub).to.have.been.calledWith "projects/abc%2Fdef/members/2"

  describe "add()", ->
    it "should use POST verb", ->
      postStub = sinon.stub members, "post"

      members.add 1, 1, 30

      postStub.restore()
      expect(postStub).to.have.been.called
