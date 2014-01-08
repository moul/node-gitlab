BaseModel = require '../BaseModel'

class Projects extends BaseModel
  init: =>
    @members = @load 'ProjectMembers'
    @hooks =   @load 'ProjectHooks'
    @issues =  @load 'ProjectIssues'
    @repository = @load 'ProjectRepository'

  all: (params = {}, fn = null) =>
    if 'function' is typeof params
      fn = params
      params = {}
    @debug "Projects::all()"
    params.page ?= 1
    params.per_page ?= 100

    (->
      data = []
      cb = (retData) =>
        if retData.length == 100
          @debug "Recurse Projects::all()"
          data = data.concat(retData)
          params.page++
          @all params, cb
        else
          data = data.concat(retData)
          fn data if fn

      @get "projects", params, cb
    ).bind(@)()

  show: (projectId, fn = null) =>
    @debug "Projects::show()"
    if typeof projectId is "number"
        projectId = projectId # Do nothing
    else if projectId.indexOf("/") isnt -1
        projectId = encodeURIComponent(projectId)
    else
        projectId = parseInt(projectId)
    @get "projects/#{projectId}", (data) => fn data if fn

  create: (params = {}, fn = null) =>
    @debug "Projects::create()"
    @post "projects", params, (data) -> fn data if fn

  addMember: (params = {}, fn = null) =>
    @debug "Projects::addMember()"
    @post "projects/#{params.id}/members", params, (data) -> fn data if fn

  editMember: (params = {}, fn = null) =>
    @debug "Projects::editMember()"
    @put "projects/#{params.id}/members/#{params.user_id}", params, (data) -> fn data if fn

  listMembers: (params = {}, fn = null) =>
    @debug "Projects::listMembers()"
    @get "projects/#{params.id}/members", (data) -> fn data if fn

  listCommits: (params = {}, fn = null) =>
    @debug "Projects::listCommits()"
    @get "projects/#{params.id}/repository/commits", (data) => fn data if fn

  listTags: (params = {}, fn = null) =>
    @debug "Projects::listTags()"
    @get "projects/#{params.id}/repository/tags", (data) => fn data if fn

module.exports = (client) -> new Projects client
