BaseModel = require '../BaseModel'

class Labels extends BaseModel

  create: (projectId, params = {}, fn = null) =>
    @debug "Labels::create()"
    if projectId.toString().indexOf("/") isnt -1
      projectId = encodeURIComponent(projectId)
    else
      projectId = parseInt(projectId)

    @post "projects/#{projectId}/labels", params, (data) -> fn data if fn

module.exports = (client) -> new Labels client
