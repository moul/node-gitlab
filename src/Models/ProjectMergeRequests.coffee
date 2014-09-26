BaseModel = require '../BaseModel'
Utils = require '../Utils'

class ProjectMergeRequests extends BaseModel
  list: (projectId, params={}, fn = null) =>
    if 'function' is typeof params
      fn = params
      params={}

    params.page ?= 1
    params.per_page ?= 100

    @debug "Projects::mergerequests()"
    @get "projects/#{Utils.parseProjectId projectId}/merge_requests", params, (data) => fn data if fn

  show: (projectId, mergerequestId, fn = null) =>
    @debug "Projects::mergerequest()"
    @get "projects/#{Utils.parseProjectId projectId}/merge_request/@{parseInt mergerequestId}", (data) => fn data if fn

  add: (projectId, sourceBranch, targetBranch, assigneeId, title, fn = null) =>
    @debug "Projects::addMergeRequest()"
    params =
      id:            Utils.parseProjectId projectId
      source_branch: sourceBranch
      target_branch: targetBranch
      assignee_id:   parseInt assigneeId
      title:         title
    @post "projects/#{Utils.parseProjectId projectId}/merge_requests", params, (data) => fn data if fn

  update: (projectId, mergerequestId, accessLevel = 30, fn = null) =>
    @debug "Projects::saveMergeRequest()"
    params =
      access_level: parseInt accessLevel
    @put "projects/#{Utils.parseProjectId projectId}/merge_request/#{parseInt mergerequestId}", params, (data) => fn data if fn

  comment: (projectId, mergerequestId, note, fn = null) =>
    @debug "Projects::commentMergeRequest()"
    params =
      id:               Utils.parseProjectId projectId
      merge_request_id: parseInt mergerequestId
      note:             note
    @post "projects/#{Utils.parseProjectId projectId}/merge_request/#{parseInt mergerequestId}/comments", params, (data) => fn data if fn

module.exports = (client) -> new ProjectMergeRequests client
