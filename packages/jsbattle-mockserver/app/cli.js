#!/usr/bin/env node
const MockServer = require('./MockServer.js');

let server = new MockServer();

console.log(process.argv);
let port = 8080;
let publicPath = './dist';
for(let i=0; i < process.argv.length; i++) {
  if(process.argv[i] == '--port') {
    i++
    port = process.argv[i];
  }
  if(process.argv[i] == '--www') {
    i++
    publicPath = process.argv[i];
  }
}

server.start({
  port: port,
  public: publicPath,
  authorized: false,
  serverDelay: 100,
  rootUrl: '/'
});
