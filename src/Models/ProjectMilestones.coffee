BaseModel = require '../BaseModel'
Utils = require '../Utils'

class ProjectMilestones extends BaseModel
  list: (projectId, fn = null) =>
    @debug "Projects::milestones()"
    @get "projects/#{Utils.parseProjectId projectId}/milestones", (data) => fn data if fn

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
