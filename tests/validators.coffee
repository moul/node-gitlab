assert = require 'assert'

module.exports.validate_project = (project) ->
  assert project.id > 0
  assert.equal 'boolean', typeof project.public
  assert.equal 'string', typeof project.name
  #assert.equal 'string', typeof project.description
