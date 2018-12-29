#!/usr/bin/env node
'use strict'

const path = require('path');
const http = require('http');
const express = require('express');
const plantuml = require('node-plantuml');
const socketIO = require('socket.io');
const ioClient = require('socket.io-client');

require('yargs') // eslint-disable-line
  .option('p', {
    alias: 'port',
    demandOption: false,
    default: 80,
    describe: 'port where http server is listening'
  })
  .option('r', {
    alias: 'root',
    demandOption: false,
    default: './',
    describe: 'web root directory'
  })
  .command(
    'start',
    'starts test server',
    (yargs) => {

    },
    (argv) => {
      let app = express();
      let server = http.createServer(app);
      app.use(express.static(path.resolve(argv.root)));
      server.listen(argv.port, () => {
        console.log('HTTP server listening on port ' + argv.port + ', serving files from ' + argv.root);
      });
      let io = socketIO(server);
      io.on('connection', (socketServer) => {
        socketServer.on('npmStop', () => {
          process.exit(0);
        });
      });
    }
  )
  .command(
    'stop',
    'stops test server',
    (yargs) => {

    },
    (argv) => {
      let socketClient = ioClient.connect('http://localhost:' + argv.port);
      console.log("Conecting to test server...");
      socketClient.on('connect', () => {
        console.log("Sending exit signal...");
        socketClient.emit('npmStop');
        setTimeout(() => {
          process.exit(0);
        }, 1000);
      });

    }
  )
  .command("*", "", (argv) => {
    console.log("Nothing happened :( Run 'test-server.js --help' for more info\n");
  })
  .help()
  .version()
  .argv;
