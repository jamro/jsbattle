const assert = require('assert');
const {Before, After, Given, When, Then } = require('cucumber');
const puppeteer = require('puppeteer');
const jsonServer = require('json-server');

var port = 8070;

After(async function () {
  if(this.server && this.server.http) {
    this.server.http.close();
    this.server.http =  null;
    this.server.mock =  null;
  }
});

Before(async function (done) {
  this.server = {};
  this.server.mock = jsonServer.create();
  var router = jsonServer.router(require(__dirname + '/../../test/api.json'));
  var middlewares = jsonServer.defaults({
    static: __dirname + '/../../dist',
    logger: false
  });

  middlewares.push((req, res, next) => {
    if(req.url.substring(0, 5) == '/api/') {
      return res.redirect(req.url.substring(4));
    }
    next();
  });
  this.server.mock.use(middlewares);
  this.server.mock.use(router)
  this.server.http = this.server.mock.listen(port, () => {
    done();
  });
});
