debug = require('debug') 'gitlab:ApiBaseHTTP'
{ApiBase} = require './ApiBase'
querystring = require 'querystring'
slumber = require 'slumber'


class module.exports.ApiBaseHTTP extends ApiBase
  handleOptions: =>
    super
    @options.base_url ?= ''

    unless @options.url
      throw "`url` is mandatory"

    unless @options.token or @options.oauth_token
      throw "`private_token` or `oauth_token` is mandatory"

    @options.slumber ?= {}
    @options.slumber.append_slash ?= false

    @options.url = @options.url.replace(/\/api\/v3/, '')

    if @options.auth?
      @options.slumber.auth = @options.auth

    debug "handleOptions()"

  init: =>
    super
    api = slumber.API @options.url, @options.slumber
    @slumber = api(@options.base_url)

  prepare_opts: (opts) =>
    opts.__query ?= {}
    if @options.token
      opts.headers = { 'PRIVATE-TOKEN': @options.token }
    else
      opts.headers = { 'Authorization': 'Bearer ' + @options.oauth_token }
    return opts

  fn_wrapper: (fn) =>
    return (err, response, ret) =>
      arity = fn.length
      switch arity
        when 1 then fn ret
        when 2
          if typeof response.body == 'object'
            fn err, ret || response.body.message
          else
            fn err, ret || JSON.parse(response.body).message
        when 3 then fn err, response, ret

  get: (path, query={}, fn=null) =>
    if 'function' is typeof query
      fn = query
      query = {}
    opts = @prepare_opts query
    @slumber(path).get opts, @fn_wrapper fn

  delete: (path, fn=null) =>
    opts = @prepare_opts {}
    @slumber(path).delete opts, @fn_wrapper fn

  post: (path, data={}, fn=null) =>
    opts = @prepare_opts data
    @slumber(path).post opts, @fn_wrapper fn

  put: (path, data={}, fn=null) =>
    opts = @prepare_opts data
    @slumber(path).put opts, @fn_wrapper fn

  patch: (path, data={}, fn=null) =>
    opts = @prepare_opts data
    @slumber(path).patch opts, @fn_wrapper fn
