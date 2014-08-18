#!/usr/bin/env node

var program = require( "commander" );

var packageInfo = require( "./../package.json" );

var fs = require( "fs" );

var path = require( "path" );

var nconf = require( "nconf" );

var gitlabDircPath = path.join( process.env[ process.platform == "win32" ? "USERPROFILE" : "HOME" ], ".gitlab" );

if ( !fs.existsSync( gitlabDircPath ) ) {
  fs.mkdirSync( gitlabDircPath );
}

var configFilePath = path.join( gitlabDircPath, "config.json" );

nconf.file( {
  file: configFilePath
} );

worker = require( "./worker.js" );

program
  .usage( "[options]" )
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
  .option( "-o, --option", "Log option", function() {
    console.log( "url: ", nconf.get( "url" ) );
    console.log( "token: ", nconf.get( "token" ) );
  } )
  .option( "*", "", function() {
    program.help();
  } )
  .option( "--user", "Get current user", function() {
    worker.users.current();
  } )
  .option( "--users", "Get all user from gitlab", function() {
    worker.users.all();
  } )
  .option( "--users-current", "Get current user from gitlab", function() {
    worker.users.current();
  } )
  .option( "--users-show <userId>", "Get user by id from gitlab", function( userId ) {
    worker.users.show( userId );
  } );

program.parse( process.argv );

if ( process.argv.length == 2 ) {
  program.help();
}