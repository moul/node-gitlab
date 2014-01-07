BaseModel = require '../BaseModel'

class ProjectMembers extends BaseModel
    list: (projectId, fn = null) =>
        @debug "Projects::members()"
        @get "projects/#{parseInt projectId}/members", (data) => fn data if fn

    show: (projectId, userId, fn = null) =>
        @debug "Projects::member()"
        @get "projects/#{parseInt projectId}/members@{parseInt userId}", (data) => fn data if fn

    add: (projectId, userId, accessLevel = 30, fn = null) =>
        @debug "Projects::addMember()"
        params =
            user_id: parseInt userId
            access_level: parseInt accessLevel
        @post "projects/#{parseInt projectId}/members", params, (data) => fn data if fn

    update: (projectId, userId, accessLevel = 30, fn = null) =>
        @debug "Projects::saveMember()"
        params =
            access_level: parseInt accessLevel
        @put "projects/#{parseInt projectId}/members/#{parseInt userId}", params, (data) => fn data if fn

    remove: (projectId, userId, fn = null) =>
        @debug "Projects::removeMember()"
        @delete "projects/#{parseInt projectId}/members/#{parseInt userId}", (data) => fn data if fn

module.exports = (client) -> new ProjectMembers client