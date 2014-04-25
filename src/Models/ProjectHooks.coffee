BaseModel = require '../BaseModel'

class ProjectHooks extends BaseModel
  list: (projectId, fn=null) =>
    @debug "Projects::hooks()"
    @get "projects/#{parseInt projectId}/hooks", (data) => fn data if fn

  show: (projectId, hookId, fn=null) =>
    @debug "Projects::hook()"
    @get "projects/#{parseInt projectId}/hooks/#{parseInt hookId}", (data) => fn data if fn

  add: (projectId, url, params=null, fn=null) =>
    @debug "Projects::addHook()"
    if 'function' is typeof(params)
      fn = params
      params = {}
    params.push_events ?= true
    params.issues_events ?= true
    params.merge_requests_events ?= true
    params.url ?= url
    @post "projects/#{parseInt projectId}/hooks", params, (data) => fn data if fn

  update: (projectId, hookId, url, params=null, fn=null) =>
    @debug "Projects::saveHook()"
    if 'function' is typeof(params)
      fn = params
      params = {}
    params.url ?= url
    @put "projects/#{parseInt projectId}/hooks/#{parseInt hookId}", params, (data) => fn data if fn

  remove: (projectId, hookId, fn=null) =>
    @debug "Projects::removeHook()"
    @delete "projects/#{parseInt projectId}/hooks/#{parseInt hookId}", (data) => fn data if fn

module.exports = (client) -> new ProjectHooks client