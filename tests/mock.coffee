class Mock
  constructor: ->
    @path = ''
    @projects = []
    project =
      id: 13
      description: ''
      default_branch: 'master'
      public: false
      visibility_level: 0
      ssh_url_to_repo: 'git@demo.gitlab.com:sandbox/afro.git'
      http_url_to_repo: 'http://demo.gitlab.com/sandbox/afro.git'
      web_url: 'http://demo.gitlab.com/sandbox/afro'
      owner:
        id: 8
        name: 'Sandbox'
        created_at: '2013-08-01T16:44:17.000Z'
      name: 'Afro'
      name_with_namespace: 'Sandbox / Afro'
      path: 'afro'
      path_with_namespace: 'sandbox/afro'
      issues_enabled: true
      merge_requests_enabled: true
      wall_enabled: false
      wiki_enabled: true
      snippets_enabled: false
      created_at: '2013-11-14T17:45:19.000Z'
      last_activity_at: '2014-01-16T15:32:07.000Z'
      namespace:
        id: 8
        name: 'Sandbox'
        path: 'sandbox'
        owner_id: 1
        created_at: '2013-08-01T16:44:17.000Z'
        updated_at: '2013-08-01T16:44:17.000Z'
        description: ''
    @projects.push project

  setup: (gitlab) =>
    before =>
      gitlab.slumber = (path) => @update_path(path)
    beforeEach =>
      do @beforeEach

  update_path: (@path) =>
    return @

  defaults:
    get: (opts, cb) ->
      cb(null, {}, [{}]) if cb
    delete: (opts, cb) ->
      cb(null, {}, [{}]) if cb
    post: (opts, cb) ->
      cb(null, {}, [{}]) if cb
    put: (opts, cb) ->
      cb(null, {}, [{}]) if cb
    patch: (opts, cb) ->
      cb(null, {}, [{}]) if cb

  beforeEach: =>
    for method in ['get', 'delete', 'post', 'put', 'patch']
      @[method] = @defaults[method]


module.exports = new Mock()
