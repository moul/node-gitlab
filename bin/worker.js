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

exports.users = {
  all: function() {
    var gitlab = requireOrGetGitlab();
    gitlab.users.all( function( users ) {
      if ( !users.length ) {
        return;
      }

      var table = new Table( {
        head: [ "id", "name", "username", "state", "email", "created_at" ]
      } );

      users.sort( function( user1, user2 ) {
        return parseInt( user1.id ) - parseInt( user2.id );
      } );

      for ( var i = 0, row, user; i < users.length; i++ ) {
        raw = {};
        user = users[ i ];
        raw[ user.id ] = [ user.name || "", user.username || "", user.state || "", user.email || "", user.created_at || "" ];
        table.push( raw );
      }

      console.log( table.toString() );
    } );
  }
}