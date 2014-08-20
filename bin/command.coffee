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

program.command("table-head")
.description("Control output. Get origin, get, set, remove or add head")
.option("--type <type>", "type of table head [user]")
.option("--origin", "Get origin table head by type")
.option("--set <head1,head2>", "Set and store table head by type. Example: gitlab table-head --set 'id','name','username' --type user")
.option("--get", "Get table head by type")
.option("--add <column>", "Add a head to table")
.option("--remove <column>", "Remove a head to table")
.option("--reset", "Reset table head to origin")
.action( (options) ->
  hasOptions = false

  if options.origin?
    hasOptions = true
    worker.tableHead.getOrigin(options.type)

  if typeof options.set is "string" and typeof options.type is "string"
    hasOptions = true
    worker.tableHead.set options.type, options.set.trim().split(",")
  else if options.get and typeof options.type is "string"
    hasOptions = true
    worker.tableHead.get options.type

  if typeof options.add is "string" and typeof options.type is "string"
    hasOptions = true
    worker.tableHead.add options.type, options.add
  else if typeof options.remove is "string" and typeof options.type is "string"
    hasOptions = true
    worker.tableHead.remove options.type, options.remove

  if options.reset and typeof options.type is "string"
    hasOptions = true
    worker.tableHead.reset(options.type)

  worker.tableHead.getType() unless hasOptions
)

program.parse process.argv

program.help()  if process.argv.length is 2
