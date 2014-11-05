#!/usr/bin/env coffee

# clear terminal
process.stdout.write '\u001B[2J\u001B[0;0f'


Gitlab = require('..')

credentials = require './credentials'

gitlab = new Gitlab
  url:      credentials.url
  token:    credentials.token

gitlab.projects.all (projects) ->
  for _project in projects
    do ->
      project = _project
      gitlab.projects.hooks.list project.id, (hooks) ->
        url = "#{credentials.service_hook_base}#{project.path_with_namespace}"
        if hooks.length > 1
          console.log "#{url} too much hooks"
        else if hooks.length is 1
          for hook in hooks
            if hook.url != url
              gitlab.projects.hooks.remove project.id, hook.id, (ret) ->
                console.log ret
          console.log "#{url} is already OK"
        else
          gitlab.projects.hooks.add project.id, url, ->
            console.log "#{url} has been added"
