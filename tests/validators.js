(function() {
  var assert;

  assert = require('assert');

  module.exports.validate_project = function(project) {
    assert(project.id > 0);
    assert.equal('boolean', typeof project["public"]);
    return assert.equal('string', typeof project.name);
  };

}).call(this);
