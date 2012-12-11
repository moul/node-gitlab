class ApiBase
    constructor: (@options) ->
        do @handleOptions
        do @init
        @debug "constructor"

    log: (args...) =>
        console.log "ApiBase>", args...

    debug: (args...) =>
        @log args... unless @options.verbose is false

    handleOptions: =>
        @options.verbose ?= false
        @debug "handleOptions()"

    init: =>
        @debug "init()"

    request: (path, fn = null) =>
        @debug "Requesting #{path}"
        #@_request "#{@options.base_url}#{path}", =>
        #    @debug "#{path} is loaded"
        do fn if fn

module.exports = ApiBase
