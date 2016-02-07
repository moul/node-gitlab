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
    @services = @load 'ProjectServices'

  all: (params={}, fn=null) =>
    if 'function' is typeof params
      fn = params
      params={}
    @debug "Projects::all()"

    params.page ?= 1
    params.per_page ?= 100

    Utils.multiPageHandler params, fn, (nextParams, cb) =>
      @debug "Recurse Projects::all()"
      @get "projects", nextParams, cb

  show: (projectId, fn=null) =>
    @debug "Projects::show()"
    @get "projects/#{Utils.parseProjectId projectId}", (data) => fn data if fn

  create: (params={}, fn=null) =>
    @debug "Projects::create()"
    @post "projects", params, (data) -> fn data if fn

  create_for_user: (params={}, fn=null) =>
    @debug "Projects::create_for_user()"
    @post "projects/user/#{params.user_id}", params, (data) -> fn data if fn

  edit: (projectId, params={}, fn=null) =>
    @debug "Projects::edit()"
    @put "projects/#{Utils.parseProjectId projectId}", params, (data) -> fn data if fn

  addMember: (params={}, fn=null) =>
    @debug "Projects::addMember()"
    @post "projects/#{params.id}/members", params, (data) -> fn data if fn

  editMember: (params={}, fn=null) =>
    @debug "Projects::editMember()"
    @put "projects/#{params.id}/members/#{params.user_id}", params, (data) -> fn data if fn

  listMembers: (params={}, fn=null) =>
    @debug "Projects::listMembers()"
    @get "projects/#{params.id}/members", (data) -> fn data if fn

  listCommits: (params={}, fn=null) =>
    @debug "Projects::listCommits()"
    @get "projects/#{params.id}/repository/commits", params, (data) => fn data if fn

  listTags: (params={}, fn=null) =>
    @debug "Projects::listTags()"
    @get "projects/#{params.id}/repository/tags", (data) => fn data if fn

  remove: (projectId, fn = null) =>
    @debug "Projects::remove()"
    @delete "projects/#{Utils.parseProjectId projectId}", (data) => fn data if fn

  fork: (params={}, fn=null) =>
    @debug "Projects::fork()"
    @post "projects/fork/#{params.id}", params, (data) -> fn data if fn

  search: (projectName, params={}, fn=null) =>
    if 'function' is typeof params
      fn = params
      params={}

    @debug "Projects::search()"
    @get "projects/search/#{projectName}", params, (data) => fn data if fn

module.exports = (client) -> new Projects client
