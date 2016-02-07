BaseModel = require '../BaseModel'
Utils = require '../Utils'

class ProjectLabels extends BaseModel
  all: (projectId, params = {}, fn = null) =>
    @debug "ProjectLabels::labels()"

    if 'function' is typeof params
      fn = params
      params = {}
    params.page ?= 1
    params.per_page ?= 100

    Utils.multiPageHandler params, fn, (nextParams, cb) =>
      @debug "Recurse ProjectLabels::all()"
      @get "projects/#{Utils.parseProjectId projectId}/labels", nextParams, cb

module.exports = (client) -> new ProjectLabels client
