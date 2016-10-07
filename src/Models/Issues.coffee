BaseModel = require '../BaseModel'

class Issues extends BaseModel
  all: (params = {}, fn = null) =>
    if 'function' is typeof params
      fn = params
      params = {}
    @debug "Issues::all()"
    params.page ?= 1
    params.per_page ?= 100

    do (->
      data = []
      cb = (retData) =>
        if retData.length == params.per_page
          @debug "Recurse Issues::all()"
          data = data.concat(retData)
          params.page++
          return @get "issues", params, cb
        else
          data = data.concat(retData)
          fn data if fn

      @get "issues", params, cb
    ).bind(@)

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

  remove: (projectId, issueId, fn = null) =>
    @debug "Issues::remove()"
    if projectId.toString().indexOf("/") isnt -1
      projectId = encodeURIComponent(projectId)
    else
      projectId = parseInt(projectId)

    if issueId.toString().indexOf("/") isnt -1
      issueId = encodeURIComponent(issueId)
    else
      issueId = parseInt(issueId)

    @delete "projects/#{projectId}/issues/#{issueId}", (data) -> fn data if fn

  subscribe: (projectId, issueId, params = {}, fn = null) =>
    @debug "Issues::subscribe()"
    if projectId.toString().indexOf("/") isnt -1
      projectId = encodeURIComponent(projectId)
    else
      projectId = parseInt(projectId)

    if issueId.toString().indexOf("/") isnt -1
      issueId = encodeURIComponent(issueId)
    else
      issueId = parseInt(issueId)

    @post "projects/#{projectId}/issues/#{issueId}/subscription", (data) -> fn data if fn

  unsubscribe: (projectId, issueId, fn = null) =>
    @debug "Issues::unsubscribe()"
    if projectId.toString().indexOf("/") isnt -1
      projectId = encodeURIComponent(projectId)
    else
      projectId = parseInt(projectId)

    if issueId.toString().indexOf("/") isnt -1
      issueId = encodeURIComponent(issueId)
    else
      issueId = parseInt(issueId)

    @delete "projects/#{projectId}/issues/#{issueId}/subscription", (data) -> fn data if fn


module.exports = (client) -> new Issues client
