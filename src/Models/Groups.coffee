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
    params.per_page ?= 100
    @get "groups", params, (data) => fn data if fn

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


module.exports = (client) -> new Groups client
