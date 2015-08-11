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
    var i, len, project, results;
    results = [];
    for (i = 0, len = projects.length; i < len; i++) {
      project = projects[i];
      results.push(console.log("#" + project.id + ": " + project.name + ", path: " + project.path + ", default_branch: " + project.default_branch + ", private: " + project["private"] + ", owner: " + project.owner.name + " (" + project.owner.email + "), date: " + project.created_at));
    }
    return results;
  });

}).call(this);
