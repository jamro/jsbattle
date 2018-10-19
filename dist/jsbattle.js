#!/usr/bin/env node

const yargs = require('yargs');
const express = require('express');
const path = require('path');

yargs
  .option('s', {
    alias: 'silent',
    demandOption: false,
    default: false,
    describe: 'turn off logging'
  })
  .option('w', {
    alias: 'webroot',
    demandOption: false,
    default: path.resolve(__dirname + '/public'),
    describe: 'path to jsbattle web folder'
  })
  .option('p', {
    alias: 'port',
    demandOption: false,
    default: "8080",
    describe: 'listening port of the web server'
  })
  .option('h', {
    alias: 'host',
    demandOption: false,
    default: "localhost",
    describe: 'host of the web server'
  })
  .command(
    'start',
    'Launch JsBattle server',
    (yargs) => {

    },
    (argv) => {
      let app = express();
      console.log(`Starting up web server, serving ${argv.webroot}`);
      app.use(express.static(argv.webroot, { maxAge: 12*60*60*1000, etag: true }));
      app.listen(
        argv.port,
        argv.host,
        () => {
          console.log(`Available on:`);
          console.log(`  http://${argv.host}:${argv.port}`);
          console.log(`Hit CTRL-C to stop the server`);
        }
      );
    }
  )
  .command("*", "", (argv) => {
    console.log("Nothing happened :( Run 'jsbattle.js --help' for more info\n");
  })
  .help()
  .version()
  .argv;
