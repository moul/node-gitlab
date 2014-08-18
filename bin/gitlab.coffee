program = require("commander")
packageInfo = require("./../package.json")
fs = require("fs")
path = require("path")
nconf = require("nconf")
worker = require("./worker.js")

gitlabDircPath = path.join(process.env[(if process.platform is "win32" then "USERPROFILE" else "HOME")], ".gitlab")
fs.mkdirSync gitlabDircPath  unless fs.existsSync(gitlabDircPath)
configFilePath = path.join(gitlabDircPath, "config.json")
nconf.file file: configFilePath

program.usage("[options]")
.version(packageInfo.version)
.option("-u, --url <url>", "Set url of gitlab", (url) ->
  nconf.set "url", url
  nconf.save()
  console.log "Save url"
).option("-t, --token <token>", "Set token of gitlab", (token) ->
  nconf.set "token", token
  nconf.save()
  console.log "Save token"
).option("-o, --option", "Log option", ->
  console.log "url: ", nconf.get("url")
  console.log "token: ", nconf.get("token")
).option("--user", "Get current user", ->
  worker.users.current()
).option("--users", "Get all user from gitlab", ->
  worker.users.all()
).option("--users-current", "Get current user from gitlab", ->
  worker.users.current()
).option("--users-show <userId>", "Get user by id from gitlab", (userId) ->
  worker.users.show userId
).option("--projects", "Get all project from gitlab", ->
  worker.projects.all()
).option "--projects-show <projectId>", "Get project by id from gitlab", (projectId) ->
  worker.projects.show projectId

program.parse process.argv
program.help()  if process.argv.length is 2
