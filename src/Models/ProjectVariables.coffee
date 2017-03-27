BaseModel = require '../BaseModel'
Utils = require '../Utils'

class ProjectVariables extends BaseModel
  list = (projectId, fn = null) ->
    console.log 'DEPRECATED: variables.list. Use variables.all instead'
    @all arguments...
  all: (projectId, fn = null) =>
    @debug "Projects::Variables::all()"
    params = {}
    params.page ?= 1
    params.per_page ?= 100

    data = []
    cb = (err, retData) =>
      if err
        return fn(retData || data) if fn
      else if retData.length == params.per_page
        @debug "Recurse Projects::Variables::all()"
        data = data.concat(retData)
        params.page++
        return @get "projects/#{Utils.parseProjectId projectId}/variables", params, cb
      else
        data = data.concat(retData)
        return fn data if fn

    @get "projects/#{Utils.parseProjectId projectId}/variables", params, cb

  show: (projectId, variableId, fn = null) =>
    @debug "Projects::Variables::show()"
    @get "projects/#{Utils.parseProjectId projectId}/variables/#{parseInt variableId}", (data) => fn data if fn

  create: (projectId, key, value, fn = null) =>
    params = {}
    params.key = key
    params.value = value;
    @debug "Projects::Variables::create()", params
    @post "projects/#{Utils.parseProjectId params.projectId}/variables", params, (data) => fn data if fn


module.exports = (client) -> new ProjectVariables client
