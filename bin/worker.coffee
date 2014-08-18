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
  table.push
    id: [project.id or ""]
    description: [(project.description or "").trim()]
    default_branch: [project.default_branch or ""]
    public: [project.public or ""]
    archived: [project.archived or ""]
    visibility_level: [project.visibility_level or ""]
    ssh_url_to_repo: [project.ssh_url_to_repo or ""]
    http_url_to_repo: [project.http_url_to_repo or ""]
    web_url: [project.web_url or ""]
    name: [project.name or ""]
    name_with_namespace: [project.name_with_namespace or ""]
    path: [project.path or ""]
    path_with_namespace: [project.path_with_namespace or ""]
    issues_enabled: [project.issues_enabled or ""]
    merge_requests_enabled: [project.merge_requests_enabled or ""]
    wiki_enabled: [project.wiki_enabled or ""]
    snippets_enabled: [project.snippets_enabled or ""]
    created_at: [project.created_at or ""]
    last_activity_at: [project.last_activity_at or ""]

  console.log table.toString()
  return

nconf = require("nconf")
Table = require("cli-table")
path = require("path")
configFilePath = path.join(process.env[(if process.platform is "win32" then "USERPROFILE" else "HOME")], ".gitlab", "config.json")
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
