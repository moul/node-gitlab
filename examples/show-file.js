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

  gitlab.projects.repository.showFile({
    projectId: projectId,
    ref: 'master',
    file_path: 'README.md'
  }, function(file) {
    console.log;
    console.log("=== File ===");
    console.log(file);
    if (file) {
      console.log;
      console.log("=== Content ===");
      return console.log((new Buffer(file.content, 'base64')).toString());
    }
  });

}).call(this);
