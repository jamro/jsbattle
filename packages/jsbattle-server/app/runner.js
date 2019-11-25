#!/usr/bin/env node

const Gateway = require('./services/Gateway.js')

let gateway = new Gateway();
gateway.init({
  data: './jsbattle-data',
  webroot: './public_html',
  host: '127.0.0.1',
  port: '9000',
  loglevel: 'debug'
})
.then(() => gateway.start())
.catch(console.error);
