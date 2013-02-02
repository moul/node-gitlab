ApiBase = require './ApiBase'

class ApiBaseHTTP extends ApiBase
    handleOptions: =>
        super
        @options.debug ?= false
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
        @debug "ApiBaseHTTP::handleOptions()"

    _translateUrl: (path) =>
        return "#{@options.path}/#{@options.base_url}/#{path}?private_token=#{@options.token}".replace /\/\//, '/'

    get: (path, fn = null) =>
        options =
            path:   @_translateUrl path
            method: 'GET'
        @_request options, fn

    delete: (path, fn = null) =>
        options =
            path:   @_translateUrl path
            method: "DELETE"
        @_request options, fn

    post: (path, data = {}, fn = null) =>
        options =
            path:   @_translateUrl path
            method: 'POST'
            data:   data
        @_request options, fn

    put: (path, data = {}, fn = null) =>
        options =
            path:   @_translateUrl path
            method: 'PUT'
            data:   data
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
        @debug options.path
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
            response.on 'data', (chunk) =>  buffer += chunk
            response.on 'end', =>           @_parseResponse buffer, fn

module.exports = ApiBaseHTTP
