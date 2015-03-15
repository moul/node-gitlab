BaseModel = require '../BaseModel'
Utils = require '../Utils'

class ProjectMembers extends BaseModel
  list: (projectId, fn = null) =>
    @debug "Projects::members()"
    @get "projects/#{Utils.parseProjectId projectId}/members", fn

  show: (projectId, userId, fn = null) =>
    @debug "Projects::member()"
    @get "projects/#{Utils.parseProjectId projectId}/members/#{parseInt userId}", fn

  add: (projectId, userId, accessLevel = 30, fn = null) =>
    @debug "Projects::addMember()"
    params =
      user_id: parseInt userId
      access_level: parseInt accessLevel
    @post "projects/#{Utils.parseProjectId projectId}/members", params, fn

  update: (projectId, userId, accessLevel = 30, fn = null) =>
    @debug "Projects::saveMember()"
    params =
      access_level: parseInt accessLevel
    @put "projects/#{Utils.parseProjectId projectId}/members/#{parseInt userId}", params, fn

  remove: (projectId, userId, fn = null) =>
    @debug "Projects::removeMember()"
    @delete "projects/#{Utils.parseProjectId projectId}/members/#{parseInt userId}", fn

module.exports = (client) -> new ProjectMembers client