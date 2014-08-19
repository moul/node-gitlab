checkOptions = ->
  unless nconf.get("url")
    console.log "You should set url by 'gitlab --url http://example.com' "
    return false
  unless nconf.get("token")
    console.log "You should set token by 'gitlab --token abcdefghij123456' "
    return false
  true
makeTableByUser = (user) ->
  table = new Table(head: USER_HEAD)
  raw = {}
  raw[user.id] = [
    user.name or ""
    user.username or ""
    user.state or ""
    user.email or ""
    user.created_at or ""
  ]
  table.push raw
  console.log table.toString()
  return
makeTableByProject = (project) ->
  table = new Table(head: [
    "key"
    "value"
  ])

  map = [
    "id",
    "description",
    "default_branch",
    "public",
    "archived",
    "visibility_level",
    "ssh_url_to_repo",
    "http_url_to_repo",
    "web_url",
    "name",
    "name_with_namespace",
    "path",
    "path_with_namespace",
    "issues_enabled",
    "merge_requests_enabled",
    "wiki_enabled",
    "snippets_enabled",
    "created_at",
    "last_activity_at"
  ]

  for key in map
    raw = {}
    raw[key] = [ project[key] or "" ]
    table.push raw

  console.log table.toString()
  return

nconf = require("nconf")
Table = require("cli-table")
fs = require("fs")
path = require("path")

gitlabDircPath = path.join(process.env[(if process.platform is "win32" then "USERPROFILE" else "HOME")], ".gitlab")
fs.mkdirSync gitlabDircPath  unless fs.existsSync(gitlabDircPath)
configFilePath = path.join(gitlabDircPath, "config.json")
nconf.file file: configFilePath
gitlab = null

requireOrGetGitlab = ->
  if gitlab?
    gitlab
  else
    if checkOptions()
      gitlab = require("gitlab")(
        url: nconf.get("url")
        token: nconf.get("token")
      )
      gitlab

USER_HEAD = [
  "id"
  "name"
  "username"
  "state"
  "email"
  "created_at"
]
exports.users =
  all: ->
    requireOrGetGitlab().users.all (users) ->
      return  unless users.length
      table = new Table(head: USER_HEAD)
      users.sort (user1, user2) ->
        parseInt(user1.id) - parseInt(user2.id)

      for user in users
        raw = {}
        raw[user.id] = [
          user.name or ""
          user.username or ""
          user.state or ""
          user.email or ""
          user.created_at or ""
        ]
        table.push raw

      console.log table.toString()
      return

  current: ->
    requireOrGetGitlab().users.current makeTableByUser
    return

  show: (userId) ->
    requireOrGetGitlab().users.show userId, makeTableByUser
    return

exports.projects =
  all: ->
    requireOrGetGitlab().projects.all (projects) ->
      return  unless projects.length
      projects.sort (project1, project2) ->
        parseInt(project1.id) - parseInt(project2.id)

      for project in projects
        makeTableByProject project
      return

  show: (userId) ->
    requireOrGetGitlab().projects.show userId, makeTableByProject
    return

exports.setUrl = (url) ->
  nconf.set "url", url
  nconf.save()
  console.log "Save url"

exports.setToken = (token) ->
  nconf.set "token", token
  nconf.save()
  console.log "Save token"

exports.getOption = ->
  console.log "url: ", nconf.get("url")
  console.log "token: ", nconf.get("token")
