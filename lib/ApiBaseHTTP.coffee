ApiBase = require './ApiBase'

class ApiBaseHTTP extends ApiBase
    handleOptions: =>
        super
        if @options.url?
            for key, value of require('url').parse @options.url
                @options[key] ?= value
        @options.host ?= @options.hostname
        host = @options.host.split ':'
        @options.hostname ?= host[0]
        @options.port ?= host[1]
        @options.username ?= null
        @options.protocol ?= 'http:'
        @options.port ?= if @options.protocol is 'https:' then 443 else 80
        @options.port = parseInt @options.port
        @options.path ?= '/'
        @options.pathname ?= @options.path
        @options.host = "#{@options.hostname}:#{@options.port}"
        @options.base_url ?= ''
        #if not @options.hostname?
        #    raise "host is mandatory"
        #if not @options.token?
        #    raise "token is mandatory"
        @debug "ApiBaseHTTP::handleOptions()"

    request: (path, fn = null) =>
        options =
            path: "#{@options.path}/#{@options.base_url}/#{path}?private_token=#{@options.token}"
        @_request options, fn

    _request_options: (options) =>
        options.host         ?= @options.hostname
        options.protocol     ?= @options.protocol
        options.port         ?= @options.port
        options.method       ?= 'GET'
        options.headers      ?= {}
        options.headers.host ?= @options.hostname
        options.header.Authorization ?= 'Basic ' + new Buffer("#{@options.username}:#{@options.password}").toString('base64') if @options.username?
        return options

    _parseResponse: (buffer, fn = null) =>
        response = JSON.parse buffer
        fn response if fn

    _request: (options, fn = null) =>
        @_request_options options
        if options.protocol is 'http:'
            @client = require('http') unless @client?
            client = @client
        else if options.protocol is 'https:'
            @client_ssl = require('https') unless @client_ssl?
            client = @client_ssl
        request = client.request options
        do request.end
        request.on 'response', (response) =>
            buffer = ''
            response.on 'data', (chunk) =>
                buffer += chunk
            response.on 'end', =>
                @_parseResponse buffer, fn

module.exports = ApiBaseHTTP
