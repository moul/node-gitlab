BaseModel = require '../BaseModel'
Utils = require '../Utils'

class Notes extends BaseModel

  create: (projectId, issueId, params = {}, fn = null) =>
    @debug "Notes::create()"
    @post "projects/#{Utils.parseProjectId projectId}/issues/#{parseInt issueId}/notes", params, (data) -> fn data if fn

module.exports = (client) -> new Notes client
