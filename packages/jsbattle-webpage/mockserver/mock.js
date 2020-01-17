const jsonServer = require('json-server');

var port = 8070;

let server = {};
server.mock = jsonServer.create();
var router = jsonServer.router(require(__dirname + '/api.json'));
var middlewares = jsonServer.defaults({
  static: __dirname + '/../dist',
  logger: false
});

middlewares.push((req, res, next) => {
  if(req.url.substring(0, 5) == '/api/') {
    return res.redirect(req.url.substring(4));
  }
  next();
});
server.mock.use(middlewares);
server.mock.use(router)
server.http = server.mock.listen(port, () => {
  console.log("Mock server started at 127.0.0.1:" + port);
  process.send('ready');
});

process.on('SIGINT', function() {
  server.http.close();
  server.http =  null;
  server.mock =  null;
})
