BaseModel = require '../BaseModel'

class ProjectMergeRequests extends BaseModel
  list: (projectId, params={}, fn = null) =>
    if 'function' is typeof params
      fn = params
      params={}

    params.page ?= 1
    params.per_page ?= 100

    @debug "Projects::mergerequests()"
    @get "projects/#{parseInt projectId}/merge_requests", params, (data) => fn data if fn

  show: (projectId, mergerequestId, fn = null) =>
    @debug "Projects::mergerequest()"
    @get "projects/#{parseInt projectId}/merge_request/@{parseInt mergerequestId}", (data) => fn data if fn

  add: (projectId, sourceBranch, targetBranch, assigneeId, title, fn = null) =>
    @debug "Projects::addMergeRequest()"
    params =
      id:            parseInt projectId
      source_branch: sourceBranch
      target_branch: targetBranch
      assignee_id:   parseInt assigneeId
      title:         title
    @post "projects/#{parseInt projectId}/merge_requests", params, (data) => fn data if fn

  update: (projectId, mergerequestId, url, fn = null) =>
    @debug "Projects::saveMergeRequest()"
    params =
      access_level: parseInt accessLevel
    @put "projects/#{parseInt projectId}/merge_request/#{parseInt mergerequestId}", params, (data) => fn data if fn

  comment: (projectId, mergerequestId, note, fn = null) =>
    @debug "Projects::commentMergeRequest()"
    params =
      id:               parseInt projectId
      merge_request_id: parseInt mergerequestId
      node:             note
    @post "projects/#{parseInt projectId}/merge_request/#{parseInt mergerequestId}/comments", params, (data) => fn data if fn

module.exports = (client) -> new ProjectMergeRequests client
