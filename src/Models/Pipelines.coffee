BaseModel = require '../BaseModel'
Utils = require '../Utils'

class Pipelines extends BaseModel
  all: (projectId, fn = null) =>
    @debug "Pipelines::all()"
    @get "projects/#{Utils.parseProjectId projectId}/pipelines", (data) => fn data if fn

module.exports = (client) -> new Pipelines client
