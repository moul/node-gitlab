class module.exports.ApiBase
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
    @client = @
    @debug "ApiBase::init()"
    @groups         = require('./Models/Groups')    @client
    @projects       = require('./Models/Projects')     @client
    #@issues        = require('./Models/Issues')    @client
    #@repositories  = require('./Models/Repositories')  @client
    @users          = require('./Models/Users')     @client
    #@mergeRequests = require('./Models/MergeRequests') @client
