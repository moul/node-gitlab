BaseModel = require '../BaseModel'
Utils = require '../Utils'

class ProjectHooks extends BaseModel
  list: (projectId, fn = null) =>
    @debug "Projects::hooks()"
    @get "projects/#{Utils.parseProjectId projectId}/hooks", fn

  show: (projectId, hookId, fn = null) =>
    @debug "Projects::hook()"
    @get "projects/#{Utils.parseProjectId projectId}/hooks/#{parseInt hookId}", fn

  add: (projectId, params, fn = null) =>
    if 'string' is typeof params
      params =
        url: params
    @debug "Projects::addHook()"
    @post "projects/#{Utils.parseProjectId projectId}/hooks", params, fn

  update: (projectId, hookId, url, fn = null) =>
    @debug "Projects::saveHook()"
    params =
      access_level: parseInt accessLevel
    @put "projects/#{Utils.parseProjectId projectId}/hooks/#{parseInt hookId}", params, fn

  remove: (projectId, hookId, fn = null) =>
    @debug "Projects::removeHook()"
    @delete "projects/#{Utils.parseProjectId projectId}/hooks/#{parseInt hookId}", fn

module.exports = (client) -> new ProjectHooks client
