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
    var user, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = users.length; _i < _len; _i++) {
      user = users[_i];
      _results.push(console.log("#" + user.id + ": " + user.email + ", " + user.name + ", " + user.created_at));
    }
    return _results;
  });

}).call(this);
