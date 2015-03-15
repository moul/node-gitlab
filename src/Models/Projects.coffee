BaseModel = require '../BaseModel'
Utils = require '../Utils'

class Projects extends BaseModel
  init: =>
    @members = @load 'ProjectMembers'
    @hooks =   @load 'ProjectHooks'
    @issues =  @load 'ProjectIssues'
    @labels =  @load 'ProjectLabels'
    @repository = @load 'ProjectRepository'
    @milestones = @load 'ProjectMilestones'
    @deploy_keys = @load 'ProjectDeployKeys'
    @merge_requests = @load 'ProjectMergeRequests'

  all: (params={}, fn=null) =>
    if 'function' is typeof params
      fn = params
      params={}
    @debug "Projects::all()"

    params.page ?= 1
    params.per_page ?= 100

    data = []
    cb = (err, retData) =>
      if err
        return fn(err, retData || data) if fn
      else if retData.length == params.per_page
        @debug "Recurse Projects::all()"
        data = data.concat(retData)
        params.page++
        return @get "projects", params, cb
      else
        data = data.concat(retData)
        return fn(null, data) if fn

    @get "projects", params, cb

  show: (projectId, fn=null) =>
    @debug "Projects::show()"
    @get "projects/#{Utils.parseProjectId projectId}", fn

  create: (params={}, fn=null) =>
    @debug "Projects::create()"
    @post "projects", params, fn

  addMember: (params={}, fn=null) =>
    @debug "Projects::addMember()"
    @post "projects/#{params.id}/members", params, fn

  editMember: (params={}, fn=null) =>
    @debug "Projects::editMember()"
    @put "projects/#{params.id}/members/#{params.user_id}", params, fn

  listMembers: (params={}, fn=null) =>
    @debug "Projects::listMembers()"
    @get "projects/#{params.id}/members", fn

  listCommits: (params={}, fn=null) =>
    @debug "Projects::listCommits()"
    @get "projects/#{params.id}/repository/commits", params, fn

  listTags: (params={}, fn=null) =>
    @debug "Projects::listTags()"
    @get "projects/#{params.id}/repository/tags", fn

module.exports = (client) -> new Projects client
