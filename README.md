node-gitlab
===========

[![Build Status (Travis)](https://travis-ci.org/node-gitlab/node-gitlab.png?branch=master)](https://travis-ci.org/node-gitlab/node-gitlab)
[![Dependency Status](https://david-dm.org/node-gitlab/node-gitlab.png?theme=shields.io)](https://david-dm.org/node-gitlab/node-gitlab)
[![authors](https://sourcegraph.com/api/repos/github.com/node-gitlab/node-gitlab/badges/authors.png)](https://sourcegraph.com/github.com/node-gitlab/node-gitlab)
[![library users](https://sourcegraph.com/api/repos/github.com/node-gitlab/node-gitlab/badges/library-users.png)](https://sourcegraph.com/github.com/node-gitlab/node-gitlab)
[![Total views](https://sourcegraph.com/api/repos/github.com/node-gitlab/node-gitlab/counters/views.png)](https://sourcegraph.com/github.com/node-gitlab/node-gitlab)
[![Views in the last 24 hours](https://sourcegraph.com/api/repos/github.com/node-gitlab/node-gitlab/counters/views-24h.png)](https://sourcegraph.com/github.com/node-gitlab/node-gitlab)
[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/node-gitlab/node-gitlab/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

[![NPM Badge](https://nodei.co/npm/gitlab.png?downloads=true&stars=true)](https://npmjs.org/package/gitlab)
--

[GitLab](https://github.com/gitlabhq/gitlabhq) API Nodejs library.
It wraps the HTTP api library described [here](https://github.com/node-gitlab/gitlabhq/tree/master/doc/api).

Maintained by [Manfred Touron](https://github.com/moul) and [Dave Irvine](https://github.com/dave-irvine)


Install
=======

```bash
# Install from npm
npm install gitlab
```

Usage
=====

URL to your GitLab instance should not include `/api/v3` path.

Coffee-Script
-------------
```coffee
# Connection
gitlab = (require 'gitlab')
  url:   'http://example.com'
  token: 'abcdefghij123456'

# Listing users
gitlab.users.all (users) ->
  console.log "##{user.id}: #{user.email}, #{user.name}, #{user.created_at}" for user in users

# Listing projects
gitlab.projects.all (projects) ->
  for project in projects
    console.log "##{project.id}: #{project.name}, path: #{project.path}, default_branch: #{project.default_branch}, private: #{project.private}, owner: #{project.owner.name} (#{project.owner.email}), date: #{project.created_at}"
```

Javascript
----------
```javascript
// Connection
var gitlab = require('gitlab')({
  url:   'http://example.com',
  token: 'abcdefghij123456'
});

// Listing users
gitlab.users.all(function(users) {
  for (var i = 0; i < users.length; i++) {
    console.log("#" + users[i].id + ": " + users[i].email + ", " + users[i].name + ", " + users[i].created_at);
  }
});

// Listing projects
gitlab.projects.all(function(projects) {
  for (var i = 0; i < projects.length; i++) {
    console.log("#" + projects[i].id + ": " + projects[i].name + ", path: " + projects[i].path + ", default_branch: " + projects[i].default_branch + ", private: " + projects[i]["private"] + ", owner: " + projects[i].owner.name + " (" + projects[i].owner.email + "), date: " + projects[i].created_at);
  }
});
```

See [Examples directory](https://github.com/node-gitlab/node-gitlab/tree/master/examples) for more examples

Develop
=======

[![Gitter chat](https://badges.gitter.im/node-gitlab/node-gitlab.png)](https://gitter.im/node-gitlab/node-gitlab)

Edit the Coffee-Script files in `src`, then build them using `cake build`.
Use `cake watch` to build files continuously while developing.

CLI
---

Check out [cli-gitlab](https://github.com/mdsb100/cli-gitlab)


Contributors
------------

- [Glavin Wiechert](https://github.com/Glavin001)
- [Florian Quiblier](https://github.com/fofoy)
- [Anthony Heber](https://github.com/aheber)
- [Evan Heidtmann](https://github.com/ezheidtmann)
- [luoqpolyvi](https://github.com/luoqpolyvi)
- [Brian Vanderbusch](https://github.com/LongLiveCHIEF)
- [daprahamian](https://github.com/daprahamian)
- [pgorecki](https://github.com/pgorecki)
- [CaoJun](https://github.com/mdsb100)
- [nalabjp](https://github.com/nalabjp)
- [shaoshuai0102](https://github.com/shaoshuai0102)
- [Sakesan Panjamawat](https://github.com/sakp)

License
-------

MIT


Changelog
=========

1.2.0 (2014-12-24)
------------------

- Switched to new organization, some urls changed
- Improve development tools
- Cleaned code
- Changed AddHook parameters
- Happy Christmas

1.1.0 (2014-11-04)
------------------

- Added project branch support
- Improved compatibility with API
- Improved global error handling
- Rebuilt javascript using latest Coffee-Script

1.0.0 (2014-08-19)
------------------

- Not fully stable, need more tests
- Now we have a CHANGELOG
