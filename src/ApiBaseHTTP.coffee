debug = require('debug') 'gitlab:ApiBaseHTTP'
{ApiBase} = require './ApiBase'
querystring = require 'querystring'

class module.exports.ApiBaseHTTP extends ApiBase
  handleOptions: =>
    super
    if @options.url?
      for key, value of require('url').parse @options.url
        @options[key] ?= value
    @options.host     ?= @options.hostname
    host               = @options.host.split ':'
    @options.hostname ?= host[0]
    @options.port     ?= host[1]
    @options.username ?= null
    @options.protocol ?= 'http:'
    @options.port     ?= if @options.protocol is 'https:' then 443 else 80
    @options.port      = parseInt @options.port
    @options.path     ?= '/'
    @options.pathname ?= @options.path
    @options.base_url ?= ''
    @options['strict-ssl'] = true unless 'boolean' is typeof @options['strict-ssl']
    debug "handleOptions()"

  _translateUrl: (path, params = {}) =>
    url = "#{@options.path}/#{@options.base_url}/#{path}?private_token=#{@options.token}".replace /\/\//, '/'
    if params
      url += "&#{querystring.stringify params}"
    return url

  get: (path, params = {}, fn = null) =>
    if 'function' is typeof params
      fn = params
      params = {}
    options =
      path:   @_translateUrl path, params
      method: 'GET'
      params: params
    @_request options, fn

  delete: (path, fn = null) =>
    options =
      path:   @_translateUrl path
      method: "DELETE"
      headers:
        'Content-Length': 0
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
    options.host         ?= @options.host
    options.protocol     ?= @options.protocol
    options.port         ?= @options.port
    options.method       ?= 'GET'
    options.headers      ?= {}
    options.headers.host ?= @options.hostname
    options.header.Authorization ?= 'Basic ' + new Buffer("#{@options.username}:#{@options.password}").toString('base64') if @options.username?
    return options

  _parseResponse: (buffer, fn = null) =>
    try
      response = JSON.parse buffer
      fn response if fn
    catch e
      console.log e, buffer

  _request: (options, fn = null) =>
    debug '_request', options.method, options.path
    @_request_options options
    if options.protocol is 'http:'
      @httpClient = require('http') unless @httpClient?
      httpClient = @httpClient
    else if options.protocol is 'https:'
      @httpClient_ssl = require('https') unless @httpClient_ssl?
      httpClient = @httpClient_ssl
    if options.data
      post_data = require('querystring').stringify options.data
      options.headers ?= {}
      options.headers['Content-Length'] ?= post_data.length
      options.headers['Content-Type'] ?= 'application/x-www-form-urlencoded'
    unless @options['strict-ssl']
      options.strictSSL = false
      options.rejectUnauthorized = false
    request = httpClient.request options
    request.write post_data if post_data?
    do request.end
    request.on 'response', (response) =>
      buffer = ''
      response.on 'data', (chunk) =>  buffer += chunk
      response.on 'end', =>           @_parseResponse buffer, fn
