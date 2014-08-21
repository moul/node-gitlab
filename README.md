node-gitlab
===========

[![Build Status (Travis)](https://travis-ci.org/moul/node-gitlab.png?branch=master)](https://travis-ci.org/moul/node-gitlab)
[![Build Status (Shippable)](https://api.shippable.com/projects/5371096b93ac868700b434d9/badge/develop)](https://www.shippable.com/projects/5371096b93ac868700b434d9)
[![Dependency Status](https://david-dm.org/moul/node-gitlab.png?theme=shields.io)](https://david-dm.org/moul/node-gitlab)
[![authors](https://sourcegraph.com/api/repos/github.com/moul/node-gitlab/badges/authors.png)](https://sourcegraph.com/github.com/moul/node-gitlab)
[![library users](https://sourcegraph.com/api/repos/github.com/moul/node-gitlab/badges/library-users.png)](https://sourcegraph.com/github.com/moul/node-gitlab)
[![Total views](https://sourcegraph.com/api/repos/github.com/moul/node-gitlab/counters/views.png)](https://sourcegraph.com/github.com/moul/node-gitlab)
[![Views in the last 24 hours](https://sourcegraph.com/api/repos/github.com/moul/node-gitlab/counters/views-24h.png)](https://sourcegraph.com/github.com/moul/node-gitlab)
[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/moul/node-gitlab/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

[![NPM Badge](https://nodei.co/npm/gitlab.png?downloads=true&stars=true)](https://npmjs.org/package/gitlab)
--

[GitLab](https://github.com/gitlabhq/gitlabhq) API Nodejs library.
It wraps the HTTP api library described [here](https://github.com/moul/gitlabhq/tree/master/doc/api).

Maintained by [Manfred Touron](https://github.com/moul) and [Dave Irvine](https://github.com/dave-irvine)


Install
=======

```bash
# Install from npm
npm install gitlab
```

CLI
=====
```bash
# Install from npm for global
npm install gitlab -g
# You will see all command
gitlab --help
# For example
gitlab url "http://example.com"
gitlab token "abcdefghij123456"
gitlab users --current

id name    username
9  Cao Jun mdsb100

```

Config CLI output?
=====
```bash
# There are some types
gitlab table-head

type of table head: [ 'user', 'project', 'issue' ]

# To see table head
gitlab table-head --get --type user

[ 'id', 'name', 'username' ]

# To see origin table head
gitlab table-head --origin --type user

[ 'id',
  'name',
  'username',
  'state',
  'avatar_url',
  'created_at',
  'is_admin',
  'bio',
  'skype',
  'linkedin',
  'twitter',
  'website_url',
  'email',
  'theme_id',
  'color_scheme_id',
  'extern_uid',
  'provider',
  'can_create_group',
  'can_create_project',
  'private_token' ]

# Add a head
gitlab table-head --add state --type user
gitlab table-head --get --type user

[ 'id', 'name', 'username', 'state' ]

gitlab users --current

id name    username state
9  Cao Jun mdsb100  active

# See "gitlab table-head --help" to see more commands.
```

Usage
=====

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

See [Examples directory](https://github.com/moul/node-gitlab/tree/master/examples) for more examples

Develop
=======

[![Gitter chat](https://badges.gitter.im/moul/node-gitlab.png)](https://gitter.im/moul/node-gitlab)

Edit the Coffee-Script files in `src`, then build them using `cake build`.
Use `cake watch` to build files continuously while developing.

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

License
-------

MIT
