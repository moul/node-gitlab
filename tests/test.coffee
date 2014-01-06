assert = require 'assert'


# Setup
Gitlab = require('..').ApiV3
credentials = # From http://demo.gitlab.com/
  host:     "http://demo.gitlab.com"
  token:    "Wvjy2Krpb7y8xi93owUz"
  password: "123456"
  login:    "test@test.com"


gitlab = new Gitlab
  token:   credentials.token
  url:     credentials.host
  verbose: true


describe 'User', ->
  describe '#all()', ->
    it 'should retrieve array of users without error', (done) ->
      gitlab.users.all (result) ->
        done()
        return result

  describe '#login()', ->
    it 'should retrieve a users session without error', (done) ->
      gitlab.users.session credentials.login, credentials.password, (result) ->
        done()
        return result


describe 'Project', ->
  describe '#all()', ->
    it 'should retrieve array of projects without error', (done) ->
      gitlab.projects.all (result) ->
        done()
        return result
