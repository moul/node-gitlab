assert = require 'assert'

# Setup
Gitlab = require('..')
credentials = # From http://demo.gitlab.com/
  host:     "http://demo.gitlab.com"
  token:    "Wvjy2Krpb7y8xi93owUz"
  password: "123456"
  login:    "test@test.com"

gitlab = new Gitlab
  token:   credentials.token
  url:     credentials.host

# Working variables
projectId = 3
userId = 1

mock = {}

# Response object from request lib.
response = {}

before ->
  gitlab.slumber = (path) -> mock

beforeEach ->
  mock.get = (opts, cb) ->
    cb(null, response, [{}]) if cb
  mock.delete = (opts, cb) ->
    cb(null, response, [{}]) if cb
  mock.post = (opts, cb) ->
    cb(null, response, [{}]) if cb
  mock.put = (opts, cb) ->
    cb(null, response, [{}]) if cb
  mock.patch = (opts, cb) ->
    cb(null, response, [{}]) if cb

describe 'User', ->
  describe '#all()', ->
    it 'should retrieve array of users without error', (done) ->
      gitlab.users.all (result) ->
        done()
        return result
  describe '#show()', ->
    it 'should retrive a single user', (done) ->
      gitlab.users.show userId, (result) ->
        done()
        return result
  describe '#session()', ->
    it 'should retrieve a users session without error', (done) ->
      gitlab.users.session credentials.login, credentials.password, (result) ->
        done()
        return result

describe 'Project', ->
  describe '#all()', ->
    beforeEach ->
      mock.get = (opts, cb) ->
        project =
          id: 1
        projects = [project]
        cb(null, response, projects)
    it 'should retrieve array of projects without error', (done) ->
      gitlab.projects.all (result) ->
        assert result.length > 0
        assert result[0].id > 0
        done()
        return result
  describe '#show()', ->
    beforeEach ->
      mock.get = (opts, cb) ->
        project =
          id: 1
        cb(null, response, project)
    it 'should retrieve single project', (done) ->
      gitlab.projects.show projectId, (result) ->
        assert result.id > 0
        done()
        return result

  describe 'Members', ->
    describe '#listMembers()', ->
      describe '#list', ->
        it 'should retrieve list of members of a project', (done) ->
          gitlab.projects.members.list projectId, (result) ->
            done()
            return result

  describe '#repository', ->
    describe '#listBranches', ->
      it 'should retrive branches of a given project', (done) ->
        gitlab.projects.repository.listBranches projectId, (result) ->
          done()
          return result
    describe '#listCommits()', ->
      it 'should retrieve list of members of a project', (done) ->
        gitlab.projects.repository.listCommits projectId, (result) ->
          done()
          return result
    describe '#listTags()', ->
      it 'should retrieve list of members of a project', (done) ->
        gitlab.projects.repository.listTags projectId, (result) ->
          done()
          return result
    describe '#listTree()', ->
      it 'should retrieve list of members of a project', (done) ->
        gitlab.projects.repository.listTree projectId, (result) ->
          done()
          return result

describe 'Issue', ->
  describe '#all()', ->
    it 'should retrieve array of issues created by user', (done) ->
      gitlab.issues.all (result) ->
        done()
        return result
