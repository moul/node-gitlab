class ApiBase
    constructor: (@options) ->
        do @handleOptions
        do @init
        @debug "ApiBase::constructor()"

    handleOptions: =>
        @options.verbose ?= false
        @debug "ApiBase::handleOptions()"

    log: (args...) =>
        name = @?.constructor?.toString?().match(/function\s*(\w+)/)?[1] || 'ApiBase'
        #arguments.callee.caller.caller.caller.caller
        console.log "#{name}>", args...

    debug: (args...) =>
        @log args... unless @options.verbose is false

    init: =>
        @debug "ApiBase::init()"

    request: (path, fn = null) =>
        @debug "ApiBase::request(#{path})"
        do fn if fn

    getProjects: (fn = null) =>
        @debug "ApiBase::getProjects()"
        @request "projects", (data = []) => fn data if fn

module.exports = ApiBase
