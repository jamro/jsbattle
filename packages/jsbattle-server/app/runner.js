#!/usr/bin/env node

const Gateway = require('./Gateway.js');
const path = require('path');

let gateway = new Gateway();
let config = {
  "loglevel": "debug",
  "data": {
    "path": path.join(__dirname, 'jsbattle-data')
  },
  "web": {
    "webroot": path.join(__dirname, 'public'),
    "host": "127.0.0.1",
    "baseUrl": "http://localhost:9000",
    "port": "9000",
    "gaCode": "AB-123456789-Z"
  },
  "auth": {
    "admins": [
      {
        provider: 'github',
        username: 'jamro'
      }
    ]
  }
};
gateway.init(config).then(() => gateway.start())
.catch(console.error);
