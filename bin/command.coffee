program = require("commander")
packageInfo = require("./../package.json")
worker = require("./worker.js")

program.usage("[options]")
.version(packageInfo.version)
.option("-u, --url <url>", "Set url of gitlab", worker.setUrl)
.option("-t, --token <token>", "Set token of gitlab", worker.setToken)
.option("-o, --option", "Get option", worker.getOption)
.option("--user", "Get current user", worker.users.current)
.option("--users", "Get all user from gitlab", worker.users.all)
.option("--users-current", "Get current user from gitlab", worker.users.current)
.option("--users-show <userId>", "Get user by id from gitlab", worker.users.show)
.option("--projects", "Get all project from gitlab", worker.projects.all)
.option("--projects-show <projectId>", "Get project by id from gitlab", worker.projects.show)

program.parse process.argv
program.help()  if process.argv.length is 2
