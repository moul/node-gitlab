class module.exports
  constructor: (@client) ->
    do @_init

  load: (model) =>
    require("./#{model}") @client

  _init: =>
    @debug =   @client.debug

    @get =     @client.get
    @post =    @client.post
    @put =     @client.put
    @delete =  @client.delete

    do @init if @init?
