chai = require 'chai'
expect = chai.expect
sinon = require 'sinon'
sinonChai = require 'sinon-chai'

chai.use sinonChai

describe "ProjectRepository", ->
  gitlab = null
  projects = null
  repository = null

  before ->
    gitlab = (require '../')
      url: 'test'
      token: 'test'

    projects = gitlab.projects
    repository = projects.repository

  beforeEach ->

  describe "listBranches()", ->
    it "should use GET verb", ->
      getStub = sinon.stub repository, "get"

      repository.listBranches 1

      getStub.restore()
      expect(getStub).to.have.been.called

  describe "listCommits()", ->
    it "should use GET verb", ->
      getStub = sinon.stub repository, "get"

      repository.listCommits 1

      getStub.restore()
      expect(getStub).to.have.been.called

  describe "addTag()", ->
    it "should use POST verb", ->
      postStub = sinon.stub repository, "post"

      opts =
        id: 1,
        tag_name: "v1.0.0",
        ref: "2695effb5807a22ff3d138d593fd856244e155e7",
        message: "Annotated message",
        release_description: "Release description"
      repository.addTag opts

      postStub.restore()
      expect(postStub).to.have.been.called

  describe "listTags()", ->
    it "should use GET verb", ->
      getStub = sinon.stub repository, "get"

      repository.listTags 1

      getStub.restore()
      expect(getStub).to.have.been.called

  describe "listTree()", ->
    it "should use GET verb", ->
      getStub = sinon.stub repository, "get"

      repository.listTree 1

      getStub.restore()
      expect(getStub).to.have.been.called

  describe "showFile()", ->
    it "should use GET verb", ->
      getStub = sinon.stub repository, "get"

      repository.showFile 1, {
        file_path: "test",
        ref: "test"
      }

      getStub.restore()
      expect(getStub).to.have.been.called
