#!/usr/bin/env node

const Node = require('./Node.js');

(async () => {
  let gateway = new Node('cli');
  let config = {
    "loglevel": "warn",
    "logger": {
        "type": "Console",
        "options": {
            colors: true,
            moduleColors: true,
            formatter: "short",
            autoPadding: true
        }
    }
  };
  await gateway.init(config);
  await gateway.start();
  console.log(await gateway.broker.call('cli.dumpDb', {dumpPath: '../../../tmp/dump/v3'}))
  console.log(await gateway.broker.call('cli.restoreDb', {dumpPath: '../../../tmp/dump/v3'}))
  console.log(await gateway.broker.call('cli.dumpDb', {dumpPath: '../../../tmp/dump/v3'}))
  await gateway.stop();
})()

