BaseModel = require '../BaseModel'

class ProjectIssues extends BaseModel
  list: (projectId, params = {}, fn = null) =>
    @debug "ProjectIssues::issues()"

    if 'function' is typeof params
      fn = params
      params = {}
    params.page ?= 1
    params.per_page ?= 100

    (->
      data = []
      cb = (retData) =>
        if retData.length == 100
          @debug "Recurse ProjectIssues::all()"
          data = data.concat(retData)
          params.page++
          @all params, cb
        else
          data = data.concat(retData)
          fn data if fn

      @get "projects/#{parseInt projectId}/issues", params, cb
    ).bind(@)()

module.exports = (client) -> new ProjectIssues client
