#!/usr/bin/env coffee

Gitlab = require('..').ApiV2

gitlab = new Gitlab
    host:    'https://git.onouo.com/'
    token:   't3Jg1ZdpJvEfAzgJeuYQ'
    verbose: true

gitlab.getProjects (projects) ->
    for project in projects
        console.log "Projects"
