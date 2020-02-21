const path = require('path')
const express = require('express')
const querystring = require('querystring')
const jsonServer = require('json-server')
const bodyParser = require('body-parser')
const _ = require('lodash');

class MockServer {

  constructor() {
    this._serverInstance = null;
    this._silentMode = false;
  }

  _log(...args) {
    if(!this._silentMode) {
      console.log.apply(this, args);
    }
  }

  getDefaultDB() {
    return path.resolve(__dirname , 'db.json')
  }

  start(options, db) {
    return new Promise((resolve) => {

      options = options || {};
      let port = options.port || 8080;
      let publicDir = options.public || './public';
      let rootUrl = options.rootUrl || '/';
      let serverDelay = options.serverDelay || 0;
      let silent = !!(options.silent);

      this._silentMode = silent;

      const server = jsonServer.create()
      const router = jsonServer.router(db || this.getDefaultDB())
      const middlewares = jsonServer.defaults({logger: !silent});

      this._log(`Server port: ${port}`);
      this._log(`Public dir: ${publicDir}`);

      let authorized = !!(options.authorized);

      router.render = (req, res) => {
        if(req.url == '/profile' && !authorized) {
          return res.jsonp({});
        }
        if(Array.isArray(res.locals.data) && Object.keys(req.query).filter((k) => (/^id$/i).test(k)).length) {
          return res.jsonp(res.locals.data[0]);
        }
        if(!Array.isArray(res.locals.data)) {
          return res.jsonp(res.locals.data);
        }
        let params = querystring.parse(req.url.split('?').pop());
        let page = params._page || 1;
        let pageSize = params._limit || 10;
        res.jsonp({
          rows: res.locals.data,
          total: 500,
          page: page,
          pageSize: pageSize,
          totalPages: Math.ceil(500/pageSize)
        })
      }

      server.use('/', express.static(publicDir));
      server.use(bodyParser.urlencoded({ extended: true }))
      server.use(bodyParser.json())
      server.get('/auth/logout', (req, res) => {
        this._log("Logout");
        authorized = false;
        res.redirect(rootUrl)
      })
      server.get('/auth/:provider', (req, res) => {
        this._log("Authorized");
        authorized = true;
        res.redirect(rootUrl)
      })

      server.use((req, res, next) => {
        if(/^\/api\/(admin|user)\//.test(req.url) && !authorized) {
          return res.status(401).send('401 Unauthorized')
        }
        next()
      });
      server.use((req, res, next) => {
        if(serverDelay) {
          req.query._delay = serverDelay;
        }
        if(req.query.page) {
          req.query._page = req.query.page;
          req.url += "&_page=" + req.query.page
        }
        if(req.query.pageSize) {
          req.query._limit = req.query.pageSize;
          req.url += "&_limit=" + req.query.pageSize
        }
        next()
      });
      server.use((req, res, next) => {
        if(req.method == 'POST') {
          let resource = req.url.replace(/^.*\/([A-Za-z]+)\/?$/, '$1');
          if(!resource) {
            return next();
          }
          let defaultEntity;
          try {
            defaultEntity = require(path.resolve(__dirname, 'entities', resource + '.js'))();
          } catch(err) {
            this._log(err);
            defaultEntity = {};
          }

          req.body = _.defaults(req.body, defaultEntity)
        }
        next();
      })
      server.use(middlewares)
      server.use(jsonServer.rewriter({
        "/api/authMethods": "/authMethods",
        "/api/profile": "/profile",
        "/api/:a/:b": "/:a,:b",
        "/api/*": "/$1"
      }))
      server.use(router)

      this._serverInstance = server.listen(port, () => {
        this._log('Mock Server is running')
        resolve();
      })
    })
  }

  stop() {
    this._serverInstance.close();
    this._log("Mock Server closed");
  }

}

module.exports = MockServer
