BaseModel = require '../BaseModel'

class Groups extends BaseModel
  all: (params = {}, fn = null) =>
    if 'function' is typeof params
      fn = params
      params = {}
    @debug "Groups::all()"
    params.per_page ?= 100
    @get "groups", params, (data) => fn data if fn

  show: (groupId, fn = null) =>
    @debug "Groups::show()"
    @get "groups/#{parseInt groupId}", (data) => fn data if fn

  listProjects: (groupId, fn = null) =>
    @debug "Groups::listProjects()"
    @get "groups/#{parseInt groupId}", (data) => fn data.projects if fn

module.exports = (client) -> new Groups client
