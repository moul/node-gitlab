program = require("commander")
packageInfo = require("./../package.json")
worker = require("./worker.js")

program.usage("[options]")
.version(packageInfo.version)
.option("-o, --option", "Get option", worker.getOption)

program.command("url [url]")
.description("Get or Set url of gitlab")
.action(worker.url)

program.command("token [token]")
.description("Get or Set token of gitlab")
.action(worker.token)

program.command("me")
.description("Get current user")
.action(worker.users.current)

program.command("projects")
.description("Get projects from gitlab")
.option("--members <projectId>", "Get members from project")
.option("--show <projectId>", "Get project by id from gitlab")
.action( (options) ->
  hasOptions = false

  if options.members?
    hasOptions = true
    worker.projects.members.list options.members

  if typeof options.show is "string"
    hasOptions = true
    worker.projects.show options.show

  worker.projects.all() unless hasOptions
)

program.command("users")
.description("Get users from gitlab")
.option("--current", "Get current user")
.option("--show <userId>", "Show user by user id")
.action( (options) ->
  hasOptions = false

  if options.current?
    hasOptions = true
    worker.users.current()

  if typeof options.show is "string"
    hasOptions = true
    worker.users.show options.show

  worker.users.all() unless hasOptions
)

program.command("issues")
.description("Get issues from gitlab")
.action(worker.issues.all)

program.command("table-head")
.description("Control output. Get origin, get, set, remove or add head")
.option("--type <type>", "Type of table head [user]")
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
    worker.tableHead.getOrigin options.type

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
    worker.tableHead.reset options.type

  worker.tableHead.getType() unless hasOptions
)

program.parse process.argv

program.help()  if process.argv.length is 2
