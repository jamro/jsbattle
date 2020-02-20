#!/usr/bin/env node
const MockServer = require('./MockServer.js');

let server = new MockServer();



console.log(process.argv);
let port = 8080;
for(let i=0; i < process.argv.length; i++) {
  if(process.argv[i] == '--port') {
    i++
    port = process.argv[i];
  }
}

server.start({
  port: port,
  public: './dist',
  authorized: false,
  serverDelay: 100,
  rootUrl: '/'
});
