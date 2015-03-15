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
    @get "projects/#{Utils.parseProjectId projectId}/merge_requests", params, fn

  show: (projectId, mergerequestId, fn = null) =>
    @debug "Projects::mergerequest()"
    @get "projects/#{Utils.parseProjectId projectId}/merge_request/#{parseInt mergerequestId}", fn

  add: (projectId, sourceBranch, targetBranch, assigneeId, title, fn = null) =>
    @debug "Projects::addMergeRequest()"
    params =
      id:            Utils.parseProjectId projectId
      source_branch: sourceBranch
      target_branch: targetBranch
      assignee_id:   parseInt assigneeId
      title:         title
    @post "projects/#{Utils.parseProjectId projectId}/merge_requests", params, fn

  update: (projectId, mergerequestId, params, fn = null) =>
    @debug "Projects::saveMergeRequest()"

    params.id = Utils.parseProjectId projectId;
    params.merge_request_id = parseInt mergerequestId;

    @put "projects/#{Utils.parseProjectId projectId}/merge_request/#{parseInt mergerequestId}", params, fn

  comment: (projectId, mergerequestId, note, fn = null) =>
    @debug "Projects::commentMergeRequest()"
    params =
      id:               Utils.parseProjectId projectId
      merge_request_id: parseInt mergerequestId
      note:             note
    @post "projects/#{Utils.parseProjectId projectId}/merge_request/#{parseInt mergerequestId}/comments", params, fn

module.exports = (client) -> new ProjectMergeRequests client
