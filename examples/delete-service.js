(function() {
  var Gitlab, credentials, gitlab, projectId, serviceName;

  process.stdout.write('\u001B[2J\u001B[0;0f');

  Gitlab = require('..');

  credentials = require('./credentials');

  gitlab = new Gitlab({
    url: credentials.url,
    token: credentials.token
  });

  projectId = parseInt(process.argv[2]);

  serviceName = process.argv[3];

  gitlab.projects.services.remove(projectId, serviceName, function(service) {
    console.log;
    console.log("=== Service ===");
    return console.log(service);
  });

}).call(this);
