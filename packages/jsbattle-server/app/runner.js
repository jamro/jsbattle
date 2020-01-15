#!/usr/bin/env node

const Gateway = require('./Gateway.js')
const path = require('path');

let gateway = new Gateway();
gateway.init({
  webroot: path.join(__dirname, 'public_html'),
  host: '127.0.0.1',
  port: '9000',
  loglevel: 'info',
  gaCode: "AB-123456789-Z"
})
.then(() => gateway.start())
.catch(console.error);
