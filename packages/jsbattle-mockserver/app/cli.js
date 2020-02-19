#!/usr/bin/env node
const MockServer = require('./MockServer.js');

let server = new MockServer();

server.start({
  port: 8080,
  public: './dist',
  authorized: false,
  serverDelay: 100,
});
