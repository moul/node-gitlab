node-gitlabpp
===========

GitlabPlusPlus (gitlabpp) is a fork from an original [repository](https://github.com/node-gitlab/node-gitlab).
The original code is missing some operations such as merge request acceptance or protect a branch with parameters.

The sole purpose of GitlabPlusPlus is only to provide the additional methods. Any development here is made as a pull 
request to the original repository. 

[GitLab](https://github.com/gitlabhq/gitlabhq) API Nodejs library.
It wraps the HTTP api library described [here](https://gitlab.com/gitlab-org/gitlab-ce/blob/8-16-stable/doc/api/README.md).

Original repo maintained by [Manfred Touron](https://github.com/moul) and [Dave Irvine](https://github.com/dave-irvine).
This fork is kept by [Miguel Ribeiro](https://github.com/mribeiro)



Install
=======

```bash
# Install from npm
npm install gitlabpp
```

Usage
=====

URL to your GitLab instance should not include `/api/v3` path.

Coffee-Script
-------------
```coffee
# Connection
gitlab = (require 'gitlabpp')
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
var gitlab = require('gitlabpp')({
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

See [Examples directory](https://github.com/mribeiro/node-gitlab/tree/master/examples) for more examples

Develop
=======

Edit the Coffee-Script files in `src`, then build them using `cake build`.
Use `cake watch` to build files continuously while developing.

However I suggest you develop and pull request for the original repository.

CLI
---

Check out [cli-gitlab](https://github.com/mdsb100/cli-gitlab)


Contributors
------------

- [Manfred Touron](https://github.com/moul)
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

[1.0.0](https://github.com/mribeiro/node-gitlab/releases/tag/1.0.0) (2017-07-06)
-------------------

- Fixed API doc link in README;
- Protect branch accepts parameters;
- Merges can be accepted.
