debug = require('debug') 'gitlab:ApiV3'
{ApiBaseHTTP} = require './ApiBaseHTTP'

class module.exports.ApiV3 extends ApiBaseHTTP
  handleOptions: =>
    super
    @options.base_url = 'api/v3'
    debug "handleOptions()"
