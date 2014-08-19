program = require("commander")
packageInfo = require("./../package.json")
worker = require("./worker.js")

program.usage("[options]")
.version(packageInfo.version)
.option("-o, --option", "Get option", worker.getOption)
.option("--user", "Get current user", worker.users.current)
.option("--users", "Get all user from gitlab", worker.users.all)
.option("--users-current", "Get current user from gitlab", worker.users.current)
.option("--users-show <userId>", "Get user by id from gitlab", worker.users.show)
.option("--projects", "Get all project from gitlab", worker.projects.all)
.option("--projects-show <projectId>", "Get project by id from gitlab", worker.projects.show)
.option("--projects-members <projectId>", "Get members from gitlab", worker.projects.members.list)
.option("--issues", "Get issues from gitlab", worker.issues.all)

program.command("url [url]")
.description("Get or Set url of gitlab")
.action(worker.url)

program.command("token [token]")
.description("Get or Set token of gitlab")
.action(worker.token)

program.parse process.argv

program.help()  if process.argv.length is 2
