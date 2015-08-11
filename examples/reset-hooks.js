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
    var _project, i, len, results;
    results = [];
    for (i = 0, len = projects.length; i < len; i++) {
      _project = projects[i];
      results.push((function() {
        var project;
        project = _project;
        return gitlab.projects.hooks.list(project.id, function(hooks) {
          var hook, j, len1, url;
          url = "" + credentials.service_hook_base + project.path_with_namespace;
          if (hooks.length > 1) {
            return console.log(url + " too much hooks");
          } else if (hooks.length === 1) {
            for (j = 0, len1 = hooks.length; j < len1; j++) {
              hook = hooks[j];
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
    return results;
  });

}).call(this);
