BaseModel = require '../BaseModel'

class Groups extends BaseModel
  init: =>
    @access_levels =
      GUEST:      10
      REPORTER:   20
      DEVELOPER:  30
      MASTER:     40
      OWNER:      50

  all: (params = {}, fn = null) =>
    if 'function' is typeof params
      fn = params
      params = {}
    @debug "Groups::all()"

    params.page ?= 1
    params.per_page ?= 100

    data = []
    cb = (err, retData) =>
      if err
        return fn(retData || data) if fn
      else if retData.length == params.per_page
        @debug "Recurse Groups::all()"
        data = data.concat(retData)
        params.page++
        return @get "groups", params, cb
      else
        data = data.concat(retData)
        return fn data if fn

    @get "groups", params, cb

  show: (groupId, fn = null) =>
    @debug "Groups::show()"
    @get "groups/#{parseInt groupId}", (data) => fn data if fn

  listProjects: (groupId, fn = null) =>
    @debug "Groups::listProjects()"
    @get "groups/#{parseInt groupId}", (data) => fn data.projects if fn

  listMembers: (groupId, fn = null) =>
    @debug "Groups::listMembers()"
    @get "groups/#{parseInt groupId}/members", (data) => fn data if fn

  addMember: (groupId, userId, accessLevel, fn=null) =>
    @debug "addMember(#{groupId}, #{userId}, #{accessLevel})"

    checkAccessLevel = =>
      for k, access_level of @access_levels
        return true if accessLevel == access_level
      false

    unless do checkAccessLevel
      throw "`accessLevel` must be one of #{JSON.stringify @access_levels}"

    params =
      user_id: userId
      access_level: accessLevel

    @post "groups/#{parseInt groupId}/members", params, (data) -> fn data if fn

  editMember: (groupId, userId, accessLevel, fn = null) =>
    @debug "Groups::editMember(#{groupId}, #{userId}, #{accessLevel})"

    checkAccessLevel = =>
      for k, access_level of @access_levels
        return true if accessLevel == access_level
      false

    unless do checkAccessLevel
      throw "`accessLevel` must be one of #{JSON.stringify @access_levels}"

    params =
      access_level: accessLevel

    @put "groups/#{parseInt groupId}/members/#{parseInt userId}", params, (data) -> fn data if fn

  removeMember: (groupId, userId, fn = null) =>
    @debug "Groups::removeMember(#{groupId}, #{userId})"
    @delete "groups/#{parseInt groupId}/members/#{parseInt userId}", (data) -> fn data if fn

  create: (params = {}, fn = null) =>
    @debug "Groups::create()"
    @post "groups", params, (data) -> fn data if fn

  addProject: (groupId, projectId, fn = null) =>
    @debug "Groups::addProject(#{groupId}, #{projectId})"
    @post "groups/#{parseInt groupId}/projects/#{parseInt projectId}", null, (data) -> fn data if fn

  deleteGroup: (groupId, fn = null) =>
    @debug "Groups::delete(#{groupId})"
    @delete "groups/#{parseInt groupId}", (data) -> fn data if fn

  search: (nameOrPath, fn = null) =>
    @debug "Groups::search(#{nameOrPath})"
    params =
      search: nameOrPath
    @get "groups", params,  (data) -> fn data if fn

module.exports = (client) -> new Groups client
