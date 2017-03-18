chai = require 'chai'
expect = chai.expect
sinon = require 'sinon'
sinonChai = require 'sinon-chai'

chai.use sinonChai

describe "ProjectMergeRequests", ->
  gitlab = null
  projects = null
  mergeRequests = null

  before ->
    gitlab = (require '../')
      url: 'test'
      token: 'test'

    projects = gitlab.projects
    mergeRequests = projects.merge_requests

  describe "changes()", ->
    it "should use GET verb", ->
      getStub = sinon.stub mergeRequests, "get"

      mergeRequests.changes 1, 100

      getStub.restore()
      expect(getStub).to.have.been.called

    it "should pass Numeric projectIDs, mergeRequestId and compile url", ->
      getStub = sinon.stub mergeRequests, "get"

      mergeRequests.changes 1, 100

      getStub.restore()
      url = "projects/1/merge_request/100/changes"
      expect(getStub).to.have.been.calledWith url

  describe "versions()", ->
    it "should use GET verb", ->
      getStub = sinon.stub mergeRequests, "get"

      mergeRequests.versions 1, 100

      getStub.restore()
      expect(getStub).to.have.been.called

    it "should pass Numeric projectIDs, mergeRequestId and compile url", ->
      getStub = sinon.stub mergeRequests, "get"

      mergeRequests.versions 1, 100

      getStub.restore()
      url = "projects/1/merge_requests/100/versions"
      expect(getStub).to.have.been.calledWith url

  describe "version()", ->
    it "should use GET verb", ->
      getStub = sinon.stub mergeRequests, "get"

      mergeRequests.version 1, 100, 200

      getStub.restore()
      expect(getStub).to.have.been.called

    it "should pass Numeric projectIDs, mergeRequestId, versionId", ->
      getStub = sinon.stub mergeRequests, "get"

      mergeRequests.version 1, 100, 200

      getStub.restore()
      url = "projects/1/merge_requests/100/versions/200"
      expect(getStub).to.have.been.calledWith url
