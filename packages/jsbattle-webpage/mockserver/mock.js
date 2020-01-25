const jsonServer = require('json-server');
const path = require('path');

var port = 8070;

let server = {};
server.mock = jsonServer.create();
var router = jsonServer.router(require(__dirname + '/api.json'));
var middlewares = jsonServer.defaults({
  static: __dirname + '/../dist',
  logger: false
});

server.mock.use(middlewares);
server.mock.use(jsonServer.rewriter(require(path.resolve(__dirname , "router.json"))));
server.mock.use(router);
server.http = server.mock.listen(port, () => {
  console.log("Mock server started at 127.0.0.1:" + port);
  if(process.send) {
    process.send('ready');
  }
});

process.on('SIGINT', function() {
  server.http.close();
  server.http =  null;
  server.mock =  null;
})
