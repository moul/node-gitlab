#!/usr/bin/env coffee

# clear terminal
process.stdout.write '\u001B[2J\u001B[0;0f'


Gitlab = require('..').ApiV2

credentials = require './credentials'

gitlab = new Gitlab
    host:    credentials.host
    token:   credentials.token
    verbose: true

gitlab.getProjects (projects) ->
    for project in projects
        console.log "Projects"
