BaseModel = require '../BaseModel'
Utils = require '../Utils'

class ProjectBuilds extends BaseModel

  # === Builds
  listBuilds: (projectId, fn = null) =>
    @debug "Projects::listBuilds()"
    @get "projects/#{Utils.parseProjectId projectId}/builds", (data) => fn data if fn

  showBuild: (projectId, buildId, fn = null) =>
    @debug "Projects::build()"
    @get "projects/#{Utils.parseProjectId projectId}/builds/#{buildId}", null, (data) => fn data if fn

  triggerBuild: (params={}, fn = null) =>
    @debug "Projects::triggerBuild()"
    @post "projects/#{Utils.parseProjectId params.projectId}/trigger/builds", params, null, (data) => fn data if fn

module.exports = (client) -> new ProjectBuilds client
