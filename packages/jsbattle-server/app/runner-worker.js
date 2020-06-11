#!/usr/bin/env node

const Worker = require('./Worker.js');

let worker = new Worker();
let config = {
  "loglevel": "debug",
  "ubdPlayer": {
    "queueQueryTime": 1000,
    "speed": 10,
    "timeout": 20000
  },
};
worker.init(config).then(() => worker.start())
.catch(console.error);
