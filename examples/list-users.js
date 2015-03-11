(function() {
  var Gitlab, credentials, gitlab;

  process.stdout.write('\u001B[2J\u001B[0;0f');

  Gitlab = require('..');

  credentials = require('./credentials');

  gitlab = new Gitlab({
    token: credentials.token,
    url: credentials.url
  });

  gitlab.users.all(function(users) {
    var i, len, results, user;
    results = [];
    for (i = 0, len = users.length; i < len; i++) {
      user = users[i];
      results.push(console.log("#" + user.id + ": " + user.email + ", " + user.name + ", " + user.created_at));
    }
    return results;
  });

}).call(this);
