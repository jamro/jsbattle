#!/usr/bin/env node

const Gateway = require('./Gateway.js')
const path = require('path');

let gateway = new Gateway();
gateway.init({
  "loglevel": "info",
  "data": {
    "path": path.join(__dirname, 'public_html')
  },
  "web": {
    "webroot": "./public",
    "host": "127.0.0.1",
    "port": "9000",
    "gaCode": "AB-123456789-Z"
  }
}).then(() => gateway.start())
.catch(console.error);
