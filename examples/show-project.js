(function() {
  var Gitlab, credentials, gitlab, projectId;

  process.stdout.write('\u001B[2J\u001B[0;0f');

  Gitlab = require('..');

  credentials = require('./credentials');

  gitlab = new Gitlab({
    url: credentials.url,
    token: credentials.token
  });

  projectId = parseInt(process.argv[2]);

  gitlab.projects.show(projectId, function(project) {
    console.log;
    console.log("=== Project ===");
    return console.log(project);
  });

  gitlab.projects.members.list(projectId, function(members) {
    console.log("");
    console.log("=== Members ===");
    return console.log(members);
  });

  gitlab.projects.milestones.list(projectId, {
    per_page: 100
  }, function(milestones) {
    console.log("");
    console.log("=== Milestones ===");
    return console.log(milestones);
  });

}).call(this);
