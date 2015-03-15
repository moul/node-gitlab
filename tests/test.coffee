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


{validate_project} = require './validators'

mock = require './mock'

unless process.env.TEST_NO_MOCK?
  mock.setup gitlab


describe 'User', ->
  describe '#all()', ->
    it 'should retrieve array of users without error', (done) ->
      gitlab.users.all (e, result) ->
        done()

  describe '#current()', ->
    it 'should retrieve current user without error', (done) ->
      gitlab.users.current (e, result) ->
        done()

  describe '#show()', ->
    it 'should retrieve a single user', (done) ->
      gitlab.users.show userId, (e, result) ->
        done()

  describe '#session()', ->
    it 'should retrieve a users session without error', (done) ->
      gitlab.users.session credentials.login, credentials.password, (e, result) ->
        done()


describe 'Project', ->
  describe '#all()', ->
    beforeEach ->
      mock.get = (opts, cb) ->
        cb(null, {}, mock.projects)
    it 'should retrieve array of projects without error', (done) ->
      gitlab.projects.all (e, projects) ->
        assert projects.length > 0
        validate_project project for project in projects
        done()


  describe '#show()', ->
    beforeEach ->
      mock.get = (opts, cb) ->
        project = mock.projects[0]
        project.id = parseInt mock.path.split('/')[-1...][0]
        cb(null, {}, project)
    it 'should retrieve single project', (done) ->
      gitlab.projects.show projectId, (e, project) ->
        assert.equal project.id, projectId
        validate_project project
        done()

  describe 'Members', ->
    describe '#listMembers()', ->
      describe '#list', ->
        it 'should retrieve list of members of a project', (done) ->
          gitlab.projects.members.list projectId, (e, result) ->
            done()

  describe '#repository', ->
    describe '#listBranches', ->
      it 'should retrive branches of a given project', (done) ->
        gitlab.projects.repository.listBranches projectId, (e, result) ->
          done()

    describe '#listCommits()', ->
      it 'should retrieve commits of a given project', (done) ->
        gitlab.projects.repository.listCommits projectId, (e, result) ->
          done()

    describe '#listTags()', ->
      it 'should retrieve tags of a given project', (done) ->
        gitlab.projects.repository.listTags projectId, (e, result) ->
          done()

    describe '#listTree()', ->
      it 'should retrieve tree of a given project', (done) ->
        gitlab.projects.repository.listTree projectId, (e, result) ->
          done()

    describe '#showFile()', ->
      it 'should retrieve specified file with arity=3', (done) ->
        opts = file_path: 'README.md', ref: 'master'
        gitlab.projects.repository.showFile projectId, opts, (e, result) ->
          done()

      it 'should retrieve specified file with arity=2', (done) ->
        opts = projectId: projectId, file_path: 'README.md', ref: 'master'
        gitlab.projects.repository.showFile opts, (e, result) ->
          done()


describe 'Issue', ->
  describe '#all()', ->
    it 'should retrieve array of issues created by user', (done) ->
      gitlab.issues.all (e, result) ->
        done()
