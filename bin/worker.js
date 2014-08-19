// Generated by CoffeeScript 1.7.1
var Table, checkOptions, configFilePath, fs, getGitlabDataTypeMap, getTableHeadByData, gitlab, gitlabDircPath, makeTableByData, makeTableByIssue, makeTableByProject, makeTableByUser, nconf, path, requireOrGetGitlab, tableHeadType;

checkOptions = function() {
  if (!nconf.get("url")) {
    console.log("You should set url by 'gitlab --url http://example.com' ");
    return false;
  }
  if (!nconf.get("token")) {
    console.log("You should set token by 'gitlab --token abcdefghij123456' ");
    return false;
  }
  return true;
};

makeTableByData = function(data, table_head) {
  var key, raw, table, _i, _len;
  if (table_head == null) {
    table_head = getTableHeadByData(data);
  }
  table = new Table({
    head: table_head.concat()
  });
  table_head.shift();
  raw = {};
  raw[data.id] = [];
  for (_i = 0, _len = table_head.length; _i < _len; _i++) {
    key = table_head[_i];
    raw[data.id].push(data[key] || "");
  }
  table.push(raw);
  return console.log(table.toString());
};

makeTableByUser = function(data) {
  return makeTableByData(data, JSON.parse(nconf.get("table_head_user")));
};

makeTableByProject = function(data) {
  return makeTableByData(data, JSON.parse(nconf.get("table_head_project")));
};

makeTableByIssue = function(data) {
  return makeTableByData(data, JSON.parse(nconf.get("table_head_issue")));
};

getTableHeadByData = function(data) {
  var key, table_head, _i, _len;
  table_head = [];
  if ((data != null) && data.constructor === Array) {
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      key = data[_i];
      if (key !== "id") {
        table_head.push(key);
      } else {
        table_head.unshift(key);
      }
    }
  } else {
    for (key in data) {
      if (key !== "id") {
        table_head.push(key);
      } else {
        table_head.unshift(key);
      }
    }
  }
  return table_head;
};

nconf = require("nconf");

Table = require("cli-table");

fs = require("fs");

path = require("path");

gitlabDircPath = path.join(process.env[(process.platform === "win32" ? "USERPROFILE" : "HOME")], ".gitlab");

if (!fs.existsSync(gitlabDircPath)) {
  fs.mkdirSync(gitlabDircPath);
}

configFilePath = path.join(gitlabDircPath, "config.json");

nconf.file({
  file: configFilePath
});

nconf.defaults({
  "table_head_user": JSON.stringify(["id", "name", "username", "state", "email", "created_at"]),
  "table_head_project": JSON.stringify(["id", "name", "public", "archived", "visibility_level", "issues_enabled", "wiki_enabled", "snippets_enabled", "created_at", "last_activity_at"]),
  "table_head_issue": JSON.stringify(["id", "iid", "project_id", "title", "description", "state", "created_at", "updated_at", "labels", "assignee", "author"])
});

gitlab = null;

tableHeadType = ["user", "project", "issue"];

requireOrGetGitlab = function() {
  if (gitlab != null) {
    return gitlab;
  } else {
    if (checkOptions()) {
      gitlab = require("gitlab")({
        url: nconf.get("url"),
        token: nconf.get("token")
      });
      return gitlab;
    }
  }
};

getGitlabDataTypeMap = function(type) {
  var map;
  if (type == null) {
    type = "user";
  }
  gitlab = requireOrGetGitlab();
  map = {
    "user": gitlab.users.current,
    "project": function(callback) {
      return gitlab.projects.all(function(projects) {
        return callback(projects[0]);
      });
    },
    "issue": function(callback) {
      return gitlab.issues.all(function(issues) {
        return callback(issues[0]);
      });
    }
  };
  return map[type] || map["user"];
};

exports.users = {
  all: function() {
    return requireOrGetGitlab().users.all(function(users) {
      var key, raw, table, table_head, user, _i, _j, _len, _len1;
      if (!users.length) {
        return;
      }
      users.sort(function(user1, user2) {
        return parseInt(user1.id) - parseInt(user2.id);
      });
      table_head = getTableHeadByData(users[0]);
      table = new Table({
        head: table_head.concat()
      });
      table_head.shift();
      for (_i = 0, _len = users.length; _i < _len; _i++) {
        user = users[_i];
        raw = {};
        raw[user.id] = [];
        for (_j = 0, _len1 = table_head.length; _j < _len1; _j++) {
          key = table_head[_j];
          raw[user.id].push(user[key] || "");
        }
        table.push(raw);
      }
      console.log(table.toString());
    });
  },
  current: function() {
    requireOrGetGitlab().users.current(makeTableByUser);
  },
  show: function(userId) {
    requireOrGetGitlab().users.show(userId, makeTableByUser);
  }
};

exports.projects = {
  all: function() {
    return requireOrGetGitlab().projects.all(function(projects) {
      var project, _i, _len;
      if (!projects.length) {
        return;
      }
      projects.sort(function(project1, project2) {
        return parseInt(project1.id) - parseInt(project2.id);
      });
      for (_i = 0, _len = projects.length; _i < _len; _i++) {
        project = projects[_i];
        makeTableByProject(project);
      }
    });
  },
  show: function(userId) {
    requireOrGetGitlab().projects.show(userId, makeTableByProject);
  },
  members: {
    list: function(projectId) {
      return requireOrGetGitlab().projects.members.list(projectId, function(members) {
        var member, _i, _len;
        if (!members.length) {
          return;
        }
        for (_i = 0, _len = members.length; _i < _len; _i++) {
          member = members[_i];
          makeTableByUser(member);
        }
      });
    }
  }
};

exports.issues = {
  all: function() {
    return requireOrGetGitlab().issues.all(function(issues) {
      var issue, _i, _len;
      if (!issues.length) {
        return;
      }
      issues.sort(function(issue1, issue2) {
        return parseInt(issue1.id) - parseInt(issue2.id);
      });
      for (_i = 0, _len = issues.length; _i < _len; _i++) {
        issue = issues[_i];
        makeTableByIssue(issue);
      }
    });
  }
};

exports.tableHead = {
  checkTableHead: function(table_head) {
    var index, key, temp, _i, _j, _len, _len1;
    if (!((table_head != null) || table_head.constructor === Array || table_head.length)) {
      return;
    }
    for (index = _i = 0, _len = table_head.length; _i < _len; index = ++_i) {
      key = table_head[index];
      table_head[index] = (key + "").trim();
    }
    for (index = _j = 0, _len1 = table_head.length; _j < _len1; index = ++_j) {
      key = table_head[index];
      if (key === "id") {
        temp = table_head[0];
        table_head[0] = table_head[index];
        table_head[index] = temp;
        return table_head;
      }
    }
    table_head[0] = "id";
    return table_head;
  },
  set: function(type, table_head) {
    table_head = this.checkTableHead(table_head);
    if (table_head != null) {
      nconf.set("table_head_" + type, JSON.stringify(table_head));
      nconf.save();
      return console.log("Save " + type + " table head");
    } else {
      return console.log("Can not save " + type + " table head, please check it");
    }
  },
  get: function(type) {
    var table_head;
    table_head = nconf.get("table_head_" + type);
    if (table_head != null) {
      return console.log(JSON.parse(table_head));
    } else {
      return console.log("Can not find " + type + " table head");
    }
  },
  add: function(type, column) {
    var table_head;
    table_head = nconf.get("table_head_" + type);
    if (table_head != null) {
      table_head = JSON.parse(table_head);
      if (table_head.indexOf(column) < 0) {
        table_head.push(column);
        return this.set(type, table_head);
      }
    }
  },
  remove: function(type, column) {
    var index, table_head;
    table_head = nconf.get("table_head_" + type);
    if (table_head != null) {
      table_head = JSON.parse(table_head);
      index = table_head.indexOf(column);
      if (index > -1) {
        table_head.splice(index, 1);
        return this.set(type, table_head);
      }
    }
  },
  reset: function(type) {
    var _base;
    return typeof (_base = getGitlabDataTypeMap(type)) === "function" ? _base(function(data) {
      if (data != null) {
        return exports.tableHead.set(type, getTableHeadByData(data));
      }
    }) : void 0;
  },
  getType: function() {
    return console.log("type of table head:", tableHeadType);
  },
  getOrigin: function(type) {
    var fn;
    fn = getGitlabDataTypeMap(type);
    if (fn != null) {
      return fn(function(data) {
        if (data == null) {
          return console.log("Can not get this type data");
        }
        return console.log(getTableHeadByData(data));
      });
    } else {
      return console.log("Error type:%j", type);
    }
  }
};

exports.url = function(url) {
  if (url != null) {
    nconf.set("url", url);
    nconf.save();
    return console.log("Save url");
  } else {
    return console.log(nconf.get("url"));
  }
};

exports.token = function(token) {
  if (token != null) {
    nconf.set("token", token);
    nconf.save();
    return console.log("Save token");
  } else {
    return console.log(nconf.get("token"));
  }
};

exports.getOption = function() {
  console.log("url: ", nconf.get("url"));
  return console.log("token: ", nconf.get("token"));
};

exports.tableHeadType = tableHeadType;
