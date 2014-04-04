BaseModel = require '../BaseModel'

class ProjectKeys extends BaseModel

  listKeys: (projectId, fn = null) =>
    @debug "ProjectKeys::listKeys()"
    @get "projects/#{parseInt projectId}/keys", (data) => fn data if fn

  getKey: (projectId, keyId, fn = null) =>
    @debug "ProjectKeys::getKey()"
    @get "projects/#{parseInt projectId}/keys/#{parseInt keyId}", (data) => fn data if fn

  addKey: (projectId, params = {}, fn = null) =>
    @debug "ProjectKeys::addKey()"
    @post "projects/#{parseInt projectId}/keys", params, (data) => fn data if fn

module.exports = (client) -> new ProjectKeys client
