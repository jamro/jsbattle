#!/usr/bin/env node

const Gateway = require('./services/Gateway.js')

let gateway = new Gateway();
gateway.init({
  data: './jsbattle-data',
  webroot: './public_html',
  host: '127.0.0.1',
  port: '9000',
  loglevel: 'debug',
  gaCode: "AB-123456789-Z"
})
.then(() => gateway.start())
.catch(console.error);
