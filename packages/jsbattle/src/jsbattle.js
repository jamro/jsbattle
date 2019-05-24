#!/usr/bin/env node

const Gateway = require('jsbattle-server').Gateway;
const path = require('path');
const yargs = require('yargs');


yargs
  .option('w', {
    alias: 'webroot',
    demandOption: false,
    default: path.resolve(__dirname + '/public'),
    describe: 'path to jsbattle web folder'
  })
  .option('p', {
    alias: 'port',
    demandOption: false,
    default: process.env.PORT,
    describe: 'listening port of the web server'
  })
  .option('h', {
    alias: 'host',
    demandOption: false,
    default: "localhost",
    describe: 'host of the web server'
  })
  .option('d', {
    alias: 'data',
    demandOption: false,
    default: path.resolve(__dirname + '/jsbattle-data'),
    describe: 'path to folder where jsbattle stores its files'
  })
  .option('l', {
    alias: 'loglevel',
    demandOption: false,
    default: 'info',
    describe: 'One of logger levels: fatal, error, warn, info, debug'
  })
  .command(
    'start',
    'Launch JsBattle server',
    (yargs) => {

    },
    (argv) => {
      let gateway = new Gateway();
      gateway.init({
        data: argv.data,
        webroot: argv.webroot,
        host: argv.host,
        port: argv.port,
        loglevel: argv.loglevel
      })
      .then(() => gateway.start())
      .then(() => {
        if(process.send) { // for child process only}
          process.send('ready');
        }
      })
      .catch(console.error);
    }
  )
  .command("*", "", (argv) => {
    console.log("Nothing happened :( Run 'jsbattle.js --help' for more info\n");
  })
  .help()
  .version()
  .argv;
