#!/usr/bin/env coffee

# clear terminal
process.stdout.write '\u001B[2J\u001B[0;0f'


Gitlab = require('..')

credentials =
  url: 'http://demo.gitlab.com'
  token: 'bad-token'

gitlab = new Gitlab
  url:     credentials.url
  token:   credentials.token

gitlab.projects.all (err, resp, result) ->
  console.log "having:    ", err: err, resp: resp, result: result
  console.log "should get: { err: '401 Unauthorized', resp: undefined, result: undefined }"
