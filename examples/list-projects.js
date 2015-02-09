(function() {
  var Gitlab, credentials, gitlab;

  process.stdout.write('\u001B[2J\u001B[0;0f');

  Gitlab = require('..');

  credentials = require('./credentials');

  gitlab = new Gitlab({
    url: credentials.url,
    token: credentials.token
  });

  gitlab.projects.all(function(projects) {
    var project, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = projects.length; _i < _len; _i++) {
      project = projects[_i];
      _results.push(console.log("#" + project.id + ": " + project.name + ", path: " + project.path + ", default_branch: " + project.default_branch + ", private: " + project["private"] + ", owner: " + project.owner.name + " (" + project.owner.email + "), date: " + project.created_at));
    }
    return _results;
  });

}).call(this);
