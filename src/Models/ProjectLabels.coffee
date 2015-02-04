BaseModel = require '../BaseModel'
Utils = require '../Utils'

class ProjectLabels extends BaseModel
  list: (projectId, params = {}, fn = null) =>
    @debug "ProjectLabels::labels()"

    if 'function' is typeof params
      fn = params
      params = {}
    params.page ?= 1
    params.per_page ?= 100

    do (->
      data = []
      cb = (err, retData) =>
        if err
          return fn data if fn
        if retData.length == params.per_page
          @debug "Recurse ProjectLabels::list()"
          data = data.concat(retData)
          params.page++
          return @get "projects/#{Utils.parseProjectId projectId}/labels", params, cb
        else
          data = data.concat(retData)
          return fn data if fn

      @get "projects/#{Utils.parseProjectId projectId}/labels", params, cb
    ).bind(@)

module.exports = (client) -> new ProjectLabels client
