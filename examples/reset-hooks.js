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
    var _i, _len, _project, _results;
    _results = [];
    for (_i = 0, _len = projects.length; _i < _len; _i++) {
      _project = projects[_i];
      _results.push((function() {
        var project;
        project = _project;
        return gitlab.projects.hooks.list(project.id, function(hooks) {
          var hook, url, _j, _len1;
          url = "" + credentials.service_hook_base + project.path_with_namespace;
          if (hooks.length > 1) {
            return console.log(url + " too much hooks");
          } else if (hooks.length === 1) {
            for (_j = 0, _len1 = hooks.length; _j < _len1; _j++) {
              hook = hooks[_j];
              if (hook.url !== url) {
                gitlab.projects.hooks.remove(project.id, hook.id, function(ret) {
                  return console.log(ret);
                });
              }
            }
            return console.log(url + " is already OK");
          } else {
            return gitlab.projects.hooks.add(project.id, url, function() {
              return console.log(url + " has been added");
            });
          }
        });
      })());
    }
    return _results;
  });

}).call(this);
