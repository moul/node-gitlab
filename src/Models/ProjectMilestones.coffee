BaseModel = require '../BaseModel'
Utils = require '../Utils'

class ProjectMilestones extends BaseModel
  list: (projectId, fn = null) =>
    @debug "Projects::milestones()"
    @get "projects/#{Utils.parseProjectId projectId}/milestones", fn

  show: (projectId, milestoneId, fn = null) =>
    @debug "Projects::milestone()"
    @get "projects/#{Utils.parseProjectId projectId}/milestones/#{parseInt milestoneId}", fn

  add: (projectId, title, description, due_date, fn = null) =>
    @debug "Projects::addMilestone()"
    params =
      id: Utils.parseProjectId projectId
      title: title
      description: description
      due_date: due_date
    @post "projects/#{Utils.parseProjectId projectId}/milestones", params, fn

  update: (projectId, milestoneId, title, description, due_date, state_event, fn = null) =>
    @debug "Projects::editMilestone()"
    params =
      id: Utils.parseProjectId projectId
      title: title
      description: description
      due_date: due_date
      state_event: state_event
    @put "projects/#{Utils.parseProjectId projectId}/milestones/#{parseInt milestoneId}", params, fn

module.exports = (client) -> new ProjectMilestones client
