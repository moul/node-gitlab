debug = require('debug') 'gitlab:ApiBaseHTTP'
{ApiBase} = require './ApiBase'
querystring = require 'querystring'
slumber = require 'slumber'
Promise = require 'bluebird'


class module.exports.ApiBaseHTTP extends ApiBase
  handleOptions: =>
    super
    @options.base_url ?= ''

    unless @options.url
      throw "`url` is mandatory"

    unless @options.token
      throw "`private_token` is mandatory"

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
    opts.__query.private_token = @options.token
    return opts

  fn_wrapper: (fn) =>
    (err, response, ret) =>
      if err
        debug 'an error has occured', err
        if 400 <= err.statusCode <= 499
          throw "Authorisation error. #{err.statusCode}. Check your key."
      arity = fn.length
      switch arity
        when 1 then fn ret
        when 2 then fn err, ret || JSON.parse(response.body).message
        when 3 then fn err, response, ret
    
  get: (path, query={}, fn=null) =>
    if 'function' is typeof query
      fn = query
      query = {}
    opts = @prepare_opts query
    if fn
      @slumber(path).get opts, @fn_wrapper fn
      null
    else
      new Promise (resolve, reject) =>
        @slumber(path).get opts, @fn_wrapper (err, ret) =>
          if err
            reject err
          else
            resolve ret

  delete: (path, fn=null) =>
    opts = @prepare_opts {}
    if fn
      @slumber(path).delete opts, @fn_wrapper fn
      null
    else
      new Promise (resolve, reject) =>
        @slumber(path).delete opts, @fn_wrapper (err, ret) =>
          if err
            reject err
          else
            resolve ret

  post: (path, data={}, fn=null) =>
    opts = @prepare_opts data
    if fn
      @slumber(path).post opts, @fn_wrapper fn
      null
    else
      new Promise (resolve, reject) =>
        @slumber(path).post opts, @fn_wrapper (err, ret) =>
          if err
            reject err
          else
            resolve ret

  put: (path, data={}, fn=null) =>
    opts = @prepare_opts data
    if fn
      @slumber(path).put opts, @fn_wrapper fn
      null
    else
      new Promise (resolve, reject) =>
        @slumber(path).put opts, @fn_wrapper (err, ret) =>
          if err
            reject err
          else
            resolve ret

  patch: (path, data={}, fn=null) =>
    opts = @prepare_opts data
    if fn
      @slumber(path).patch opts, @fn_wrapper fn
      null
    else
      new Promise (resolve, reject) =>
        @slumber(path).patch opts, @fn_wrapper (err, ret) =>
          if err
            reject err
          else
            resolve ret