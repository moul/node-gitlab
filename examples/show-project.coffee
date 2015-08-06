#!/usr/bin/env coffee

# clear terminal
process.stdout.write '\u001B[2J\u001B[0;0f'


Gitlab = require('..')

credentials = require './credentials'

gitlab = new Gitlab
    url:     credentials.url
    token:   credentials.token

projectId = parseInt process.argv[2]

gitlab.projects.show projectId, (project) ->
    console.log
    console.log "=== Project ==="
    console.log project

gitlab.projects.members.list projectId, (members) ->
    console.log ""
    console.log "=== Members ==="
    console.log members
    
gitlab.projects.milestones.list projectId, {per_page: 100}, (milestones) ->
    console.log ""
    console.log "=== Milestones ==="
    console.log milestones
