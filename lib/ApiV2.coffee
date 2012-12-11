ApiBase = require './ApiBase'

class ApiV2 extends ApiBase
    handleOptions: =>
        @options.base_url ?= 'api/v2'
        super

    getProjects: (fn = null) =>
        @debug "getProjects()"
        @request "projects", (data) =>
            fn data if fn

module.exports = ApiV2
