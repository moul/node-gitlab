BaseModel = require '../BaseModel'
Utils = require '../Utils'

class IssueNotes extends BaseModel
  all: (projectId, issueId, params = {}, fn = null) =>
    @debug "IssueNotes::notes()"

    if 'function' is typeof params
      fn = params
      params = {}
    params.page ?= 1
    params.per_page ?= 100

    data = []
    cb = (err, retData) =>
      if err
        return fn data if fn
      else if retData.length == params.per_page
        @debug "Recurse IssueNotes::all()"
        data = data.concat(retData)
        params.page++
        return @get "projects/#{Utils.parseProjectId projectId}/issues/#{parseInt issueId}/notes", params, cb
      else
        data = data.concat(retData)
        return fn data if fn

    @get "projects/#{Utils.parseProjectId projectId}/issues/#{parseInt issueId}/notes", params, cb

module.exports = (client) -> new IssueNotes client
