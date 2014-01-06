BaseModel = require '../BaseModel'

class ProjectHooks extends BaseModel
    list: (projectId, fn = null) =>
        @debug "Projects::hooks()"
        @get "projects/#{parseInt projectId}/hooks", (data) => fn data if fn

    show: (projectId, hookId, fn = null) =>
        @debug "Projects::hook()"
        @get "projects/#{parseInt projectId}/hooks/#{parseInt hookId}", (data) => fn data if fn

    add: (projectId, url, fn = null) =>
        @debug "Projects::addHook()"
        params =
            url: url
        @post "projects/#{parseInt projectId}/hooks", params, (data) => fn data if fn

    update: (projectId, hookId, url, fn = null) =>
        @debug "Projects::saveHook()"
        params =
            access_level: parseInt accessLevel
        @put "projects/#{parseInt projectId}/hooks/#{parseInt hookId}", params, (data) => fn data if fn

    remove: (projectId, hookId, fn = null) =>
        @debug "Projects::removeHook()"
        @delete "projects/#{parseInt projectId}/hooks/#{parseInt hookId}", (data) => fn data if fn

module.exports = (client) -> new ProjectHooks client