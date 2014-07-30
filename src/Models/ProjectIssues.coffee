BaseModel = require '../BaseModel'
Utils = require '../Utils'

class ProjectIssues extends BaseModel
  list: (projectId, params = {}, fn = null) =>
    @debug "ProjectIssues::issues()"

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
          @debug "Recurse ProjectIssues::list()"
          data = data.concat(retData)
          params.page++
          return @get "projects/#{Utils.parseProjectId projectId}/issues", params, cb
        else
          data = data.concat(retData)
          return fn data if fn

      @get "projects/#{Utils.parseProjectId projectId}/issues", params, cb
    ).bind(@)

  show: (projectId, issueId, params = {}, fn = null) =>
    @debug "ProjectIssues::show()"
    if projectId.toString().indexOf("/") isnt -1
      projectId = encodeURIComponent(projectId)
    else
      projectId = parseInt(projectId)
        
    if issueId.toString().indexOf("/") isnt -1
      issueId = encodeURIComponent(issueId)
    else
      issueId = parseInt(issueId)
   
    @get "projects/#{projectId}/issues/#{issueId}", params, (data) -> fn data if fn

module.exports = (client) -> new ProjectIssues client
