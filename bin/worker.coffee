checkOptions = ->
  unless nconf.get("url")
    console.log "You should set url by 'gitlab --url http://example.com' "
    return false
  unless nconf.get("token")
    console.log "You should set token by 'gitlab --token abcdefghij123456' "
    return false
  true

makeTableByData = (data, table_head) ->
  unless table_head?
    table_head = []
    for key of data
      # Make id is first
      if key isnt "id" then table_head.push(key) else table_head.unshift(key)
  table = new Table(head: table_head.concat())

  table_head.shift()

  raw = {}
  raw[data.id] = []
  for key in table_head
    raw[data.id].push data[key] or ""

  table.push raw

  console.log table.toString()

makeTableByUser = (data) ->
  makeTableByData(data, ["id", "name", "username", "state", "email", "created_at"])

makeTableByProject = (project) ->
  table = new Table(head: [
    "key"
    "value"
  ])

  map = []
  for key of project
    # Make id is first
    if key isnt "id" then map.push(key) else map.unshift(key)

  for key in map
    raw = {}
    if key isnt "namespace"
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

exports.users =
  all: ->
    requireOrGetGitlab().users.all (users) ->
      return  unless users.length
      users.sort (user1, user2) ->
        parseInt(user1.id) - parseInt(user2.id)

      table_head = []
      for key of users[0]
        # Make id is first
        if key isnt "id" then table_head.push(key) else table_head.unshift(key)

      table = new Table(head: table_head.concat())

      table_head.shift()

      for user in users
        raw = {}
        raw[user.id] = []
        for key in table_head
          raw[user.id].push user[key] or ""
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

  members:
    list: (projectId) ->
      requireOrGetGitlab().projects.members.list projectId, (members) ->
        return  unless members.length
        for member in members
          makeTableByData member
        return

exports.issues =
  all: ->
    requireOrGetGitlab().issues.all (issues) ->
      return  unless issues.length
      issues.sort (issue1, issue2) ->
        parseInt(issue1.id) - parseInt(issue2.id)

      for issue in issues
        makeTableByData issue
      return

exports.url = (url) ->
  if url?
    nconf.set "url", url
    nconf.save()
    console.log "Save url"
  else
    console.log nconf.get "url"

exports.token = (token) ->
  if token?
    nconf.set "token", token
    nconf.save()
    console.log "Save token"
  else
    console.log nconf.get "token"

exports.getOption = ->
  console.log "url: ", nconf.get("url")
  console.log "token: ", nconf.get("token")
