#!/usr/bin/env node

const Node = require('./Node.js');

let worker = new Node('worker');
let config = {
  "cluster": {
    "enabled": true,
    "name": "jsbattle-dev"
  },
  "loglevel": "debug",
  "logger": {
      "type": "Console",
      "options": {
          colors: true,
          moduleColors: true,
          formatter: "short",
          autoPadding: true
      }
  },
  "ubdPlayer": {
    "queueQueryTime": 1000,
    "speed": 10,
    "timeout": 20000
  },
};
worker.init(config).then(() => worker.start())
.catch(console.error);
