BaseModel = require '../BaseModel'
Utils = require '../Utils'

class Labels extends BaseModel

  create: (projectId, params = {}, fn = null) =>
    @debug "Labels::create()"
    @post "projects/#{Utils.parseProjectId projectId}/labels", params, fn

module.exports = (client) -> new Labels client
