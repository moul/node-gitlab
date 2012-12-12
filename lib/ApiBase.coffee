class ApiBase
    constructor: (@options) ->
        do @handleOptions
        do @init
        @debug "constructor"

    handleOptions: =>
        @options.verbose ?= false
        @debug "handleOptions()"
        if not @options.host?
            raise "host is mandatory"
        if not @options.token?
            raise "token is mandatory"

    log: (args...) =>
        arr = @?.constructor?.toString?().match(/function\s*(\w+)/)
        name = if arr?.length is 2 then arr[1] else 'ApiBase'
        #arguments.callee.caller.caller.caller.caller
        console.log "#{name}>", args...

    debug: (args...) =>
        @log args... unless @options.verbose is false

    init: =>
        @debug "init()"

    request: (path, fn = null) =>
        @debug "Requesting #{path}"
        #@_request "#{@options.base_url}#{path}", =>
        #    @debug "#{path} is loaded"
        do fn if fn

module.exports = ApiBase
