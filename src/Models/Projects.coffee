BaseModel = require './BaseModel'

class Projects extends BaseModel
  init: =>
    @members = @load 'ProjectMembers'
    @hooks =   @load 'ProjectHooks'

  all: (params = {}, fn = null) =>
    if 'function' is typeof params
      fn = params
      params = {}
    @debug "Projects::all()"
    params.per_page ?= 100
    @get "projects", params, (data) => fn data if fn

  show: (projectId, fn = null) =>
    @debug "Projects::show()"
    @get "projects/#{parseInt projectId}", (data) => fn data if fn

  create: (params = {}, fn = null) =>
    @debug "Projects::create()"
    @post "projects", params, (data) -> fn data if fn

  addMember: (params = {}, fn = null) =>
    @debug "Projects::addMember()"
    @post "projects/#{params.id}/members", params, (data) -> fn data if fn

  listMembers: (params = {}, fn = null) =>
    @debug "Projects::listMembers()"
    @get "projects/#{params.id}/members", (data) -> fn data if fn

  listCommits: (params = {}, fn = null) =>
    @debug "Projects::listCommits()"
    @get "projects/#{params.id}/repository/commits", (data) => fn data if fn

module.exports = (client) -> new Projects client

