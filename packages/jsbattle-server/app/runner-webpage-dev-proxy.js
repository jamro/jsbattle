#!/usr/bin/env node

// use that runner to work on jsbattle-webpage in dev mode.
// Simply run
// ```
//  $ packages/jsbattle-server/app/runner-weppage-dev-proxy.js
//  $ cd packages/jsbattle-webpage
//  $ npm run start:dev
// ```

const Node = require('./Node.js');
const path = require('path');

let gateway = new Node();
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
  "web": {
    "webroot": path.join(__dirname, 'public'),
    "host": "127.0.0.1",
    "baseUrl": "http://localhost:8080",
    "port": "9000",
    "gaCode": "AB-123456789-Z"
  },
  "league": {
    "scheduleInterval": 500,
    "timeLimit": 10000
  },
  "ubdPlayer": {
    "enabled": true,
    "queueLimit": 3,
    "queueQueryTime": 500,
    "speed": 10,
    "timeout": 5000
  },
  "auth": {
    "enabled": true,
    "admins": [
      {
        provider: 'github',
        username: 'jamro'
      },
      {
        provider: 'mock',
        username: 'mock'
      }
    ],
    "providers": [{ "name": "mock" }]
  }
};
gateway.init(config).then(() => gateway.start())
.catch(console.error);
