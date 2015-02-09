debug = require('debug') 'gitlab:ApiBase'

class module.exports.ApiBase
  constructor: (@options) ->
    do @handleOptions
    do @init
    debug "constructor()"

  handleOptions: =>
    @options.verbose ?= false
    debug "handleOptions()"

  init: =>
    @client = @
    debug "init()"
    @groups         = require('./Models/Groups')        @client
    @projects       = require('./Models/Projects')      @client
    @issues         = require('./Models/Issues')        @client
    @notes          = require('./Models/Notes')         @client
    #@repositories  = require('./Models/Repositories')  @client
    @users          = require('./Models/Users')         @client
    #@mergeRequests = require('./Models/MergeRequests') @client
    @labels         = require('./Models/Labels')        @client
