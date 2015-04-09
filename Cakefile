{spawn, exec} = require 'child_process'

coffee = './node_modules/.bin/coffee'

call = (command, args = [], fn = null) ->
  exec "#{command} #{args.join(' ')}", (err, stdout, stderr) ->
    if err?
      console.error "Error :"
      return console.dir   err
    fn err if fn

system = (command, args) ->
  spawn command, args, stdio: "inherit"

build = (fn = null) ->
  call coffee,     ['-c', '--no-header', '-o', 'lib', 'src']
  call coffee,     ['-c', '--no-header', '-o', 'examples', 'examples']
  call coffee,     ['-c', '--no-header', '-o', 'tests', 'tests']

watch = (fn = null) ->
  system coffee,     ['-w', '--no-header', '-c', '-o', 'lib', 'src']
  system coffee,     ['-w', '--no-header', '-c', '-o', 'examples', 'examples']
  system coffee,     ['-w', '--no-header', '-c', '-o', 'tests', 'tests']

task 'watch', 'continually build the JavaScript code', ->
  watch ->
    console.log "Done !"

task 'build', 'build the JavaScript code', ->
  build ->
    console.log "Done !"
