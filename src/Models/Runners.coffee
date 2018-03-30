BaseModel = require '../BaseModel'
Utils = require '../Utils'

class Runners extends BaseModel
  all: (projectId, params={}, fn = null) =>
    if 'function' is typeof params
      fn = params
      params={}

    @debug "Projects::Runners::all()"

    if projectId?
      @get "projects/#{Utils.parseProjectId projectId}/runners", params, (data) => fn data if fn
    else
      @get "runners", params, (data) => fn data if fn

  show: (runnerId, fn = null) =>
    @debug "Projects::Runners::show()"
    @get "runners/#{parseInt runnerId}", (data) => fn data if fn

  update: (runnerId, attributes, fn = null) =>
    @debug "Projects::Runners::update"
    @put "runners/#{parseInt runnerId}", attributes, (data) => fn data if fn

  remove: (runnerId, projectId, enable, fn = null) =>
    @debug "Projects::Runners::runners()"
    @delete "runners/#{parseInt runnerId}", (data) => fn data if fn

  enable: (projectId, runnerId, fn = null) =>
    @debug "Projects::Runners::enable()"
    attributes:
      runner_id: parseInt runnerId
    @post "projects/#{Utils.parseProjectId projectId}/runners", attributes, (data) -> fn data if fn

  disable: (projectId, runnerId, fn = null) =>
    @debug "Projects::Runners::disable()"
    @delete "projects/#{Utils.parseProjectId projectId}/runners/#{parseInt runnerId}", (data) -> fn data if fn

module.exports = (client) -> new Runners client
