#!/usr/bin/env node

const yargs = require('yargs');
const fs = require('fs');
const path = require('path');
const UbdArenaService = require('jsbattle-server').UbdArenaService;

yargs
  .option('f', {
    alias: 'file',
    demandOption: true,
    default: 'battle.ubd',
    describe: 'path to *.ubd file',
    type: 'string'
  })
  .option('o', {
    alias: 'output',
    demandOption: false,
    default: 'battleOutput.json',
    describe: 'path to output',
    type: 'string'
  })
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
    default: "3000",
    describe: 'listening port of the web server'
  })
  .option('h', {
    alias: 'host',
    demandOption: false,
    default: "localhost",
    describe: 'host of the web server'
  })
  .command(
    'play',
    'play a battle from UBD file',
    (yargs) => {

    },
    async (argv) => {
      let options = {};
      options.debug = !argv.silent;
      options.webroot = argv.webroot;
      options.webport = argv.port;
      options.webhost = argv.host;
      let service;
      try {
        let content = fs.readFileSync(argv.file, "utf8");
        service = new UbdArenaService(options);

        await service.init();
        let result = await service.process(content);
        await service.close();

        console.log("Processing output: --------------------------");
        console.log(result);
        console.log("---------------------------------------------");
        fs.writeFileSync(argv.output, JSON.stringify(result), 'utf8');
      } catch(err) {
        if(service) {
          service.close();
        }
        if(options.debug) {
          console.log(err);
        } else {
          console.log(String(err));
        }
        process.exit(1);
      }
    }
  )
  .help()
  .version()
  .argv;
