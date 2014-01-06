debug = require('debug') 'gitlab:Models:BaseModel'

class module.exports
  constructor: (@client) ->
    do @_init

  load: (model) =>
    require("./#{model}") @client

  _init: =>
    @debug =    debug

    @get =     @client.get
    @post =    @client.post
    @put =     @client.put
    @delete =  @client.delete

    do @init if @init?
