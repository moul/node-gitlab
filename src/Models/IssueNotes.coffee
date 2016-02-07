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

    Utils.multiPageHandler params, fn, (nextParams, cb) =>
      @debug "Recurse IssueNotes::all()"
      @get "projects/#{Utils.parseProjectId projectId}/issues/#{parseInt issueId}/notes", nextParams, cb

module.exports = (client) -> new IssueNotes client
