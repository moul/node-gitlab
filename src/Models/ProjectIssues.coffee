BaseModel = require '../BaseModel'
Utils = require '../Utils'

class ProjectIssues extends BaseModel
  init: =>
    @notes = @load 'IssueNotes'

  list: (projectId, params = {}, fn = null) =>
    @debug "ProjectIssues::issues()"

    if 'function' is typeof params
      fn = params
      params = {}
    params.page ?= 1
    params.per_page ?= 100

    Utils.multiPageHandler params, fn, (nextParams, cb) =>
      @debug "Recurse ProjectIssues::list()"
      @get "projects/#{Utils.parseProjectId projectId}/issues", nextParams, cb

module.exports = (client) -> new ProjectIssues client
