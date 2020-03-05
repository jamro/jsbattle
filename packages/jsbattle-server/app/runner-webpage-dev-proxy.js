#!/usr/bin/env node

// use that runner to work on jsbattle-webpage in dev mode.
// Simply run
// ```
//  $ packages/jsbattle-server/app/runner-weppage-dev-proxy.js
//  $ cd packages/jsbattle-webpage
//  $ npm run start:dev
// ```

const Gateway = require('./Gateway.js');
const path = require('path');

let gateway = new Gateway();
let config = {
  "loglevel": "debug",
  "web": {
    "webroot": path.join(__dirname, 'public'),
    "host": "127.0.0.1",
    "baseUrl": "http://localhost:8080",
    "port": "9000",
    "gaCode": "AB-123456789-Z"
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
