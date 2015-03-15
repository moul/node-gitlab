BaseModel = require '../BaseModel'

class Users extends BaseModel
  all: (params = {}, fn = null) =>
    if 'function' is typeof params
      fn = params
      params = {}
    @debug "Users::all()"

    params.page ?= 1
    params.per_page ?= 100

    data = []
    cb = (err, retData) =>
      if err
        return fn(retData || data) if fn
      else if retData.length == params.per_page
        @debug "Recurse Users::all()"
        data = data.concat(retData)
        params.page++
        return @get "users", params, cb
      else
        data = data.concat(retData)
        return fn data if fn

    @get "users", params, fn

  current: (fn = null) =>
    @debug "Users::current()"
    @get "user", fn

  show: (userId, fn = null) =>
    @debug "Users::show()"
    @get "users/#{parseInt userId}", fn

  create: (params = {}, fn = null) =>
    @debug "Users::create()", params
    @post "users", params, fn

  session: (email, password, fn = null) =>
    @debug "Users::session()"
    params =
      email: email
      password: password
    @post "session", params, fn

  search: (emailOrUsername, fn = null) =>
    @debug "Users::search(#{emailOrUsername})"
    params =
      search: emailOrUsername
    @get "users", params, fn

module.exports = (client) -> new Users client
