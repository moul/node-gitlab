(function() {
  var Gitlab, credentials, gitlab, userId;

  process.stdout.write('\u001B[2J\u001B[0;0f');

  Gitlab = require('..');

  credentials = require('./credentials');

  gitlab = new Gitlab({
    url: credentials.url,
    token: credentials.token
  });

  userId = parseInt(process.argv[2]);

  gitlab.users.show(userId, function(user) {
    return console.log(user);
  });

}).call(this);
