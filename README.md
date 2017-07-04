node-gitlab
===========

[![Build Status (Travis)](https://travis-ci.org/node-gitlab/node-gitlab.png?branch=master)](https://travis-ci.org/node-gitlab/node-gitlab)
[![Dependency Status](https://david-dm.org/node-gitlab/node-gitlab.png?theme=shields.io)](https://david-dm.org/node-gitlab/node-gitlab)
[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/node-gitlab/node-gitlab/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
[![Code Climate](https://codeclimate.com/github/node-gitlab/node-gitlab/badges/gpa.svg)](https://codeclimate.com/github/node-gitlab/node-gitlab)

[![NPM Badge](https://nodei.co/npm/gitlab.png?downloads=true&stars=true)](https://npmjs.org/package/gitlab)
--

[GitLab](https://github.com/gitlabhq/gitlabhq) API Nodejs library.
It wraps the HTTP api library described [here](https://gitlab.com/gitlab-org/gitlab-ce/blob/8-16-stable/doc/api/README.md).

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
- [Jose Jiménez](https://github.com/jjimenezlopez)
- [huhgawz](https://github.com/huhgawz)
- [Connor Weng](https://github.com/ConnorWeng)
- [Felix Fichte](https://github.com/spruce)
- [Steve Norman](https://github.com/stevenorman)
- [Pete Ward](https://github.com/peteward44)
- [Pieter Soudan](https://github.com/Sewdn)
- [Ryan Southern](https://github.com/ryansouthern)
- [Zhongyi Tong](https://github.com/geeeeeeeeek)
- [mrawdon](https://github.com/mrawdon)
- [Marcus M. Darden](https://github.com/marcus-darden)

License
-------

MIT


Changelog
=========

master (unreleased)
-------------------

* No entry.

[Full commits list](https://github.com/node-gitlab/node-gitlab/compare/v1.7.1...master)

[1.7.1](https://github.com/node-gitlab/node-gitlab/tree/v1.7.1) (2016-08-04)
-------------------

- Bug: fix create MR ([@zhangqingyv](https://github.com/zhangqingyv))

[Full commits list](https://github.com/node-gitlab/node-gitlab/compare/v1.7.0...v1.7.1)

[1.7.0](https://github.com/node-gitlab/node-gitlab/tree/v1.7.0) (2016-07-11)
----------------------

- Add support for adding a tag to a project
- Add gitlab.projects.repository.compare()
- Add support for portion builds API
- Set slumber version to non-breaking

[Full commits list](https://github.com/node-gitlab/node-gitlab/compare/v1.6.0...v1.7.0)


[1.6.0](https://github.com/node-gitlab/node-gitlab/tree/v1.6.0) (2016-05-10)
----------------------

- Add function to query all projects as admin
- Add oauth_token option to authenticate connection
- Add possibility to showFile by sha id
- Add support for the GitLab services API
- Fix undefined assigneeId in merge request (#111)

[Full commits list](https://github.com/node-gitlab/node-gitlab/compare/v1.5.0...v1.6.0)

[1.5.0](https://github.com/node-gitlab/node-gitlab/tree/v1.5.0) (2015-11-26)
----------------------

- Add `Project.edit`
- Add `Projects.create_for_user`
- Add ssh key to user
- Add Projects forks

Thanks to [@peteward44](https://github.com/peteward44),
[@Sewdn](https://github.com/Sewdn), [@ryansouthern](https://github.com/ryansouthern)
and [@geeeeeeeeek](https://github.com/geeeeeeeeek)

[Full commits list](https://github.com/node-gitlab/node-gitlab/compare/v1.4.1...v1.5.0)

1.4.1 (2015-08-11)
------------------

- Coffee rebuild

[1.4.0](https://github.com/node-gitlab/node-gitlab/tree/v1.4.0) (2015-08-11)
------------------

- Now using headers for PRIVATE-TOKEN
- Add `Groups.create`, `Groups.addProject` and `Groups.search` methods
- Add `Projects.remove` and `Projects.search` methods
- Add `UserKeys` resource
- Add `Users.search` method
- Rename `ProjectMielstones.get` to `ProjectMilestones.all`
- Handling pagination on multiple new `.all()` methods
- Various stability and performance fixes

Thanks to [@huhgawz](https://github.com/huhgawz),
[@ConnorWeng](https://github.com/ConnorWeng), [@langma](https://github.com/langma),
[@spruce](https://github.com/spruce), [@stevenorman](https://github.com/stevenorman)
and [@nogs](https://github.com/nogs)


[Full commits list](https://github.com/node-gitlab/node-gitlab/compare/v1.3.0...v1.4.0)

[1.3.0](https://github.com/node-gitlab/node-gitlab/tree/v1.3.0) (2015-02-09)
------------------

- Now handling notes
- Now handling lables
- Added Groups.addMember() and Groups.access_levels
- Checking for permissions
- Added tests
- Code cleanup and various small improvements

[Full commits list](https://github.com/node-gitlab/node-gitlab/compare/v1.2.0...v1.3.0)

[1.2.0](https://github.com/node-gitlab/node-gitlab/tree/v1.2.0) (2014-12-24)
------------------

- Switched to new organization, some urls changed
- Improve development tools
- Cleaned code
- Changed AddHook parameters
- Happy Christmas

[Full commits list](https://github.com/node-gitlab/node-gitlab/compare/v1.1.0...v1.2.0)

[1.1.0](https://github.com/node-gitlab/node-gitlab/tree/v1.1.0) (2014-11-04)
------------------

- Added project branch support
- Improved compatibility with API
- Improved global error handling
- Rebuilt javascript using latest Coffee-Script

[Full commits list](https://github.com/node-gitlab/node-gitlab/compare/v1.0.0...v1.1.0)

[1.0.0](https://github.com/node-gitlab/node-gitlab/tree/v1.0.0) (2014-08-19)
------------------

- Not fully stable, need more tests
- Now we have a CHANGELOG

[POC](https://github.com/node-gitlab/node-gitlab/tree/e7a5eedea4c27aed8bd567a3c455ec311b915d60) (2012-12-11)
----------------

- POC
