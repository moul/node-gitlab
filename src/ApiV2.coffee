ApiBaseHTTP = require './ApiBaseHTTP'

class ApiV2 extends ApiBaseHTTP
    handleOptions: =>
        super
        @options.base_url = 'api/v2'
        @debug "ApiV2::handleOptions()"
        #console.log @options

module.exports = ApiV2
