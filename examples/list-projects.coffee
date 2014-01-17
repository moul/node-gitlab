#!/usr/bin/env coffee

# clear terminal
process.stdout.write '\u001B[2J\u001B[0;0f'


Gitlab = require('..')

credentials = require './credentials'

gitlab = new Gitlab
    url:     credentials.url
    token:   credentials.token

gitlab.projects.all (projects) ->
    #console.log projects
    for project in projects
        console.log "##{project.id}: #{project.name}, path: #{project.path}, default_branch: #{project.default_branch}, private: #{project.private}, owner: #{project.owner.name} (#{project.owner.email}), date: #{project.created_at}"
        #console.log project
