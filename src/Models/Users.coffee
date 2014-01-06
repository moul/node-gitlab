BaseModel = require '../BaseModel'

class Users extends BaseModel
    all: (fn = null) =>
        @debug "Users::all()"
        @get "users", (data) => fn data if fn

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

module.exports = (client) -> new Users client
