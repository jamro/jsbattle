#!/usr/bin/env node

const Node = require('jsbattle-server').Node;
const path = require('path');
const _ = require('lodash');
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
      let config = {};
      if(argv.config) {
        config = require(path.resolve(argv.config));
      }
      config = _.defaultsDeep(config, {
        web: {
          webroot: path.resolve(__dirname, 'public')
        }
      });

      // overrride config by CLI arguments
      if(argv.loglevel) {
        config.loglevel = argv.loglevel
      }

      let gateway = new Node();
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
  .command(
    'worker',
    'Launch JsBattle worker (scaling out)',
    (yargs) => {

    },
    (argv) => {
      let config = {};
      if(argv.config) {
        config = require(path.resolve(argv.config));
      }

      // overrride config by CLI arguments
      if(argv.loglevel) {
        config.loglevel = argv.loglevel
      }

      let worker = new Node('worker');
      worker.init(config)
      .then(() => worker.start())
      .then(() => {
        if(process.send) { // for child process only}
          process.send('ready');
        }
      })
      .catch(console.error);
    }
  )
  .command(
    'dump [dumpPath]',
    'Dump JsBattle DB to files',
    (yargs) => {
      return yargs.positional('dumpPath', {
        describe: 'path to directory where DB dump will be stored',
        default: './jsbattle-dump'
      })
    },
    (argv) => {
      let config = {};
      if(argv.config) {
        config = require(path.resolve(argv.config));
      }

      // override config by CLI arguments
      if(argv.loglevel) {
        config.loglevel = argv.loglevel
      }

      let cli = new Node('cli');
      cli.init(config)
        .then(() => cli.start())
        .then(() => cli.broker.call('cli.dumpDb', {dumpPath: argv.dumpPath}))
        .then(() => cli.stop())
        .catch(console.error);
    }
  )
  .command(
    'restore [dumpPath]',
    'Restore JsBattle DB from dump files',
    (yargs) => {
      return yargs.positional('dumpPath', {
        describe: 'path to directory where DB dump will be read',
        default: './jsbattle-dump'
      })
    },
    (argv) => {
      let config = {};
      if(argv.config) {
        config = require(path.resolve(argv.config));
      }

      // override config by CLI arguments
      if(argv.loglevel) {
        config.loglevel = argv.loglevel
      }

      let cli = new Node('cli');
      cli.init(config)
        .then(() => cli.start())
        .then(() => cli.broker.call('cli.restoreDb', {dumpPath: argv.dumpPath}))
        .then(() => cli.stop())
        .catch(console.error);
    }
  )
  .command("*", "", (argv) => {
    console.log("Nothing happened :( Run 'jsbattle.js --help' for more info\n");
  })
  .help()
  .version()
  .argv;
