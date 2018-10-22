#!/usr/bin/env node

const yargs = require('yargs');
const express = require('express');
const path = require('path');
const uuidv1 = require('uuid/v1');
const bodyParser = require('body-parser');
const fs = require('fs');;

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
  .option('d', {
    alias: 'data',
    demandOption: false,
    default: path.resolve(__dirname + '/jsbattle-data'),
    describe: 'path to folder where jsbattle stores its files'
  })
  .command(
    'start',
    'Launch JsBattle server',
    (yargs) => {

    },
    (argv) => {
      // make sure that data dir exists
      console.log("Creating data dir...");
      var mkdir = function(dir){
        if (fs.existsSync(dir)){
          return;
        }
        try {
          fs.mkdirSync(dir);
        } catch(err) {
          if(err.code == 'ENOENT'){
            mkdir(path.dirname(dir)); //create parent dir
            mkdir(dir); //create dir
          }
        }
      };
      mkdir(path.resolve(argv.data + "/battle-store/"));

      let app = express();
      console.log(`Starting up web server, serving ${argv.webroot}`);
      app.use(express.static(argv.webroot, { maxAge: 12*60*60*1000, etag: true }));
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({
        extended: true
      }));
      app.post('/share', function (req, res) {
        let battleId = uuidv1();
        let filename = argv.data + "/battle-store/" + battleId + ".json";

        fs.writeFile(filename, req.body.ubd, (err) => {
          if(err) {
            res.status(500);
            res.send("Error 500: Cannot write battle data to the store");
            return console.error(err);
          }
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify({battleId: battleId}));
        });

      });
      app.get('/replay/:battleId', function (req, res) {

        let filename = argv.data + "/battle-store/" + req.params.battleId + ".json";
        fs.readFile(filename, 'utf8', function(err, contents) {
          if(err) {
            res.status(500);
            res.send("Error 500: Cannot read battle data from the store");
            return console.error(err);
          }

          let ubdJson;
          try {
            ubdJson = JSON.parse(contents);
          } catch(err) {
            res.status(500);
            res.send("Error 500: Cannot parse battle data");
            return console.error(err);
          }

          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify({ubd: ubdJson}));
        });
      });
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
