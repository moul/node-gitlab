BaseModel = require '../BaseModel'
Utils = require '../Utils'

class Users extends BaseModel
  init: =>
    @keys = @load 'UserKeys'

  all: (params = {}, fn = null) =>
    if 'function' is typeof params
      fn = params
      params = {}
    @debug "Users::all()"

    params.page ?= 1
    params.per_page ?= 100

    Utils.multiPageHandler params, fn, (nextParams, cb) =>
      @debug "Recurse Users::all()"
      @get "users", nextParams, cb

  current: (fn = null) =>
    @debug "Users::current()"
    @get "user", (data) -> fn data if fn

  show: (userId, fn = null) =>
    @debug "Users::show()"
    @get "users/#{parseInt userId}", (data) => fn data if fn

  create: (params = {}, fn = null) =>
    @debug "Users::create()", params
    @post "users", params, (data) -> fn data if fn

  session: (email, password, fn = null) =>
    @debug "Users::session()"
    params =
      email: email
      password: password
    @post "session", params, (data) -> fn data if fn

  search: (emailOrUsername, fn = null) =>
    @debug "Users::search(#{emailOrUsername})"
    params =
      search: emailOrUsername
    @get "users", params, (data) -> fn data if fn

module.exports = (client) -> new Users client
