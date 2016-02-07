BaseModel = require '../BaseModel'
Utils = require '../Utils'

class Issues extends BaseModel
  all: (params = {}, fn = null) =>
    if 'function' is typeof params
      fn = params
      params = {}
    @debug "Issues::all()"
    params.page ?= 1
    params.per_page ?= 100

    Utils.multiPageHandler params, fn, (nextParams, cb) =>
      @debug "Recurse Issues::all()"
      @get "issues", nextParams, cb

  show: (projectId, issueId, fn = null) =>
    @debug "Issues::show()"
    if projectId.toString().indexOf("/") isnt -1
      projectId = encodeURIComponent(projectId)
    else
      projectId = parseInt(projectId)
    if issueId.toString().indexOf("/") isnt -1
      issueId = encodeURIComponent(issueId)
    else
      issueId = parseInt(issueId)
    @get "projects/#{projectId}/issues/#{issueId}", (data) => fn data if fn

  create: (projectId, params = {}, fn = null) =>
    @debug "Issues::create()"
    if projectId.toString().indexOf("/") isnt -1
      projectId = encodeURIComponent(projectId)
    else
      projectId = parseInt(projectId)

    @post "projects/#{projectId}/issues", params, (data) -> fn data if fn

  edit: (projectId, issueId, params = {}, fn = null) =>
    @debug "Issues::edit()"
    if projectId.toString().indexOf("/") isnt -1
      projectId = encodeURIComponent(projectId)
    else
      projectId = parseInt(projectId)

    if issueId.toString().indexOf("/") isnt -1
      issueId = encodeURIComponent(issueId)
    else
      issueId = parseInt(issueId)

    @put "projects/#{projectId}/issues/#{issueId}", params, (data) -> fn data if fn

module.exports = (client) -> new Issues client
