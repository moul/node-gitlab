var nconf = require( "nconf" );

var Table = require( "cli-table" );

var path = require( "path" );

var configFilePath = path.join( process.env[ process.platform == "win32" ? "USERPROFILE" : "HOME" ], ".gitlab", "config.json" );

nconf.file( {
  file: configFilePath
} );

var gitlab = null;

function checkOptions() {
  if ( !nconf.get( "url" ) ) {
    console.log( "You should set url by 'gitlab --url http://example.com' " );
    return false;
  }
  if ( !nconf.get( "token" ) ) {
    console.log( "You should set token by 'gitlab --token abcdefghij123456' " );
    return false;
  }
  return true;
}

requireOrGetGitlab = function() {
  if ( gitlab != null ) {
    return gitlab;
  } else {
    if ( checkOptions() ) {
      gitlab = require( "gitlab" )( {
        url: nconf.get( "url" ),
        token: nconf.get( "token" )
      } );
      return gitlab;
    }
  }
}

var USER_HEAD = [ "id", "name", "username", "state", "email", "created_at" ];

exports.users = {
  all: function() {
    requireOrGetGitlab().users.all( function( users ) {
      if ( !users.length ) {
        return;
      }

      var table = new Table( {
        head: USER_HEAD
      } );

      users.sort( function( user1, user2 ) {
        return parseInt( user1.id ) - parseInt( user2.id );
      } );

      for ( var i = 0, raw, user; i < users.length; i++ ) {
        raw = {};
        user = users[ i ];
        raw[ user.id ] = [ user.name || "", user.username || "", user.state || "", user.email || "", user.created_at || "" ];
        table.push( raw );
        console.log();
      }

      console.log( table.toString() );
    } );
  },
  current: function() {
    requireOrGetGitlab().users.current( makeTableByUser );
  },
  show: function( userId ) {
    requireOrGetGitlab().users.show( userId, makeTableByUser );
  }

}

exports.projects = {
  all: function() {
    requireOrGetGitlab().projects.all( function( projects ) {
      if ( !projects.length ) {
        return;
      }
      projects.sort( function( project1, project2 ) {
        return parseInt( project1.id ) - parseInt( project2.id );
      } );

      for ( var i = 0, project, table; i < projects.length; i++ ) {
        project = projects[ i ];
        makeTableByProject( project );
      }
    } );
  },
  show: function( userId ) {
    requireOrGetGitlab().projects.show( userId, makeTableByProject );
  }
}

function makeTableByUser( user ) {
  var table = new Table( {
    head: USER_HEAD
  } );

  var raw = {};

  raw[ user.id ] = [ user.name || "", user.username || "", user.state || "", user.email || "", user.created_at || "" ];

  table.push( raw );

  console.log( table.toString() );
}

function makeTableByProject( project ) {
  var table = new Table( {
    head: [ "key", "value" ]
  } );

  table.push( {
    "id": [ project.id || "" ]
  }, {
    "description": [ ( project.description || "" ).trim() ]
  }, {
    "default_branch": [ project.default_branch || "" ]
  }, {
    "public": [ project.public || "" ]
  }, {
    "archived": [ project.archived || "" ]
  }, {
    "visibility_level": [ project.visibility_level || "" ]
  }, {
    "ssh_url_to_repo": [ project.ssh_url_to_repo || "" ]
  }, {
    "http_url_to_repo": [ project.http_url_to_repo || "" ]
  }, {
    "web_url": [ project.web_url || "" ]
  }, {
    "name": [ project.name || "" ]
  }, {
    "name_with_namespace": [ project.name_with_namespace || "" ]
  }, {
    "path": [ project.path || "" ]
  }, {
    "path_with_namespace": [ project.path_with_namespace || "" ]
  }, {
    "issues_enabled": [ project.issues_enabled || "" ]
  }, {
    "merge_requests_enabled": [ project.merge_requests_enabled || "" ]
  }, {
    "wiki_enabled": [ project.wiki_enabled || "" ]
  }, {
    "snippets_enabled": [ project.snippets_enabled || "" ]
  }, {
    "created_at": [ project.created_at || "" ]
  }, {
    "last_activity_at": [ project.last_activity_at || "" ]
  } );

  console.log( table.toString() );
}