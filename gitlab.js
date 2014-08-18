#!/usr/bin/env node

var program = require("commander");

var packageInfo = require("./package.json")

program
  .version(packageInfo.version)
  .option("-v, --version", packageInfo.version)
  .parse(process.argv);