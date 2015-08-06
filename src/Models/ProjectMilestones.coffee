BaseModel = require '../BaseModel'
Utils = require '../Utils'

class ProjectMilestones extends BaseModel
  list = (projectId, fn = null) ->
    console.log 'DEPRECATED: milestone.list. Use milestone.all instead'
    @all arguments...
  all: (projectId, fn = null) =>
    @debug "Projects::Milestones::all()"
    params = {}
    params.page ?= 1
    params.per_page ?= 100

    data = []
    cb = (err, retData) =>
      if err
        return fn(retData || data) if fn
      else if retData.length == params.per_page
        @debug "Recurse Projects::Milestones::all()"
        data = data.concat(retData)
        params.page++
        return @get "projects/#{Utils.parseProjectId projectId}/milestones", params, cb
      else
        data = data.concat(retData)
        return fn data if fn

    @get "projects/#{Utils.parseProjectId projectId}/milestones", params, cb

  show: (projectId, milestoneId, fn = null) =>
    @debug "Projects::milestone()"
    @get "projects/#{Utils.parseProjectId projectId}/milestones/#{parseInt milestoneId}", (data) => fn data if fn

  add: (projectId, title, description, due_date, fn = null) =>
    @debug "Projects::addMilestone()"
    params =
      id: Utils.parseProjectId projectId
      title: title
      description: description
      due_date: due_date
    @post "projects/#{Utils.parseProjectId projectId}/milestones", params, (data) => fn data if fn

  update: (projectId, milestoneId, title, description, due_date, state_event, fn = null) =>
    @debug "Projects::editMilestone()"
    params =
      id: Utils.parseProjectId projectId
      title: title
      description: description
      due_date: due_date
      state_event: state_event
    @put "projects/#{Utils.parseProjectId projectId}/milestones/#{parseInt milestoneId}", params, (data) => fn data if fn

module.exports = (client) -> new ProjectMilestones client
