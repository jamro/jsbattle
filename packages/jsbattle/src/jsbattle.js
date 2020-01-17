#!/usr/bin/env node

const Gateway = require('jsbattle-server').Gateway;
const path = require('path');
const yargs = require('yargs');


yargs
  .option('l', {
    alias: 'loglevel',
    demandOption: false,
    default: undefined,
    describe: 'One of logger levels: fatal, error, warn, info, debug'
  })
  .option('c', {
    alias: 'config',
    demandOption: false,
    default: undefined,
    describe: 'path to configuration file'
  })
  .command(
    'start',
    'Launch JsBattle server',
    (yargs) => {

    },
    (argv) => {
      let config = {
        "loglevel": "info",
        "data": {
          "path": "./jsbattle-data"
        },
        "web": {
          "webroot": "./public",
          "host": "127.0.0.1",
          "port": "8080",
          "gaCode": ""
        }
      };
      if(argv.config) {
        config = require(path.resolve(argv.config));
      }
      config.web = config.web || {};
      config.data = config.data || {};
      config.loglevel = argv.loglevel || config.loglevel || "info"

      let gateway = new Gateway();
      gateway.init(config)
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
