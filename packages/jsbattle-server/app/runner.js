#!/usr/bin/env node

const Gateway = require('./Gateway.js');
const path = require('path');

let gateway = new Gateway();
let config = {
  "loglevel": "debug",
  "web": {
    "webroot": path.join(__dirname, 'public'),
    "host": "127.0.0.1",
    "baseUrl": "http://localhost:9000",
    "port": "9000",
    "gaCode": "AB-123456789-Z"
  },
  "league": {
    "scheduleInterval": 1000,
    "timeLimit": 10000
  },
  "ubdPlayer": {
    "enabled": true,
    "queueLimit": 3,
    "queueQueryTime": 1000,
    "speed": 5,
    "timeout": 20000
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
