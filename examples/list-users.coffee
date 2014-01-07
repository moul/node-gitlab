#!/usr/bin/env coffee

# clear terminal
process.stdout.write '\u001B[2J\u001B[0;0f'


Gitlab = require('..').ApiV2

credentials = require './credentials'

gitlab = new Gitlab
    url:     credentials.url
    token:   credentials.token

gitlab.users.all (users) ->
    #console.log users
    for user in users
        console.log "##{user.id}: #{user.email}, #{user.name}, #{user.created_at}"
        #console.log user
