BaseModel = require '../BaseModel'
Utils = require '../Utils'

class ProjectKeys extends BaseModel

  listKeys: (projectId, fn = null) =>
    @debug "ProjectKeys::listKeys()"
    @get "projects/#{Utils.parseProjectId projectId}/keys", fn

  getKey: (projectId, keyId, fn = null) =>
    @debug "ProjectKeys::getKey()"
    @get "projects/#{Utils.parseProjectId projectId}/keys/#{parseInt keyId}", fn

  addKey: (projectId, params = {}, fn = null) =>
    @debug "ProjectKeys::addKey()"
    @post "projects/#{Utils.parseProjectId projectId}/keys", params, fn

module.exports = (client) -> new ProjectKeys client
