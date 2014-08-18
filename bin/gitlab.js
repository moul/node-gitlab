#!/usr/bin/env node

var program = require( "commander" );

var packageInfo = require( "./../package.json" );

var fs = require( "fs" );

var path = require( "path" );

var nconf = require( "nconf" );

var gitlabDircPath = path.join( process.env[ process.platform == 'win32' ? 'USERPROFILE' : 'HOME' ], '.gitlab' );

if ( !fs.existsSync( gitlabDircPath ) ) {
  fs.mkdirSync( gitlabDircPath );
}

var configFilePath = path.join( gitlabDircPath, "config.json" );

nconf.file( {
  file: configFilePath
} );

program
  .usage( '[options] <value>' )
  .version( packageInfo.version )
  .option( "-u, --url <url>", "Set url of gitlab", function( url ) {
    nconf.set( "url", url );
    nconf.save();
    console.log( "Save url" );
  } )
  .option( "-t, --token <token>", "Set token of gitlab", function( token ) {
    nconf.set( "token", token );
    nconf.save();
    console.log( "Save token" );
  } )
  .option( "-o, --options", "Log options", function() {
    console.log( "url: %j", nconf.get( "url" ) );
    console.log( "token: %j", nconf.get( "token" ) );
  } )
  .parse( process.argv );

if ( !program.args.length ) program.help();