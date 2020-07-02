const ApiService = require("moleculer-web");
const cookieParser = require('cookie-parser');
const auditMiddleware = require('../../../lib/auditMiddleware.js').express;
const jwtMiddleware = require('../../../lib/jwtMiddleware.js');
const routing = require('../lib/routing.js');
const authorize = require('../lib/authorize.js');
const express = require('express');
const stringReplace = require('../../../lib/stringReplaceMiddleware.js');
const path = require('path');
const configPassport = require('../lib/configPassport.js');
const http = require('http');
const IO = require("socket.io");

module.exports = function() {

  let corsOrigin = this.settings.web.corsOrigin;
  if(!Array.isArray(corsOrigin)) {
    corsOrigin = [corsOrigin]
  }
  corsOrigin.push(this.settings.web.baseUrl)

  const svc = this.broker.createService({
    mixins: [ApiService],
    settings: {
      cors: {
        origin: corsOrigin,
        methods: [
          "GET",
          "OPTIONS",
          "POST",
          "PUT",
          "DELETE",
          "PATCH"
        ],
        credentials: true
      },
      routes: [
        {
          authorization: true,
          path: '/admin',
          mappingPolicy: 'restrict',
          use: [cookieParser()],
          onBeforeCall: auditMiddleware,
          onAfterCall: jwtMiddleware,
          aliases: routing.admin,
          bodyParsers: {
            json: true,
            urlencoded: { extended: true }
          }
        },
        {
          path: '/user',
          authorization: true,
          mappingPolicy: 'restrict',
          use: [cookieParser()],
          onBeforeCall: auditMiddleware,
          onAfterCall: jwtMiddleware,
          aliases: routing.user,
          bodyParsers: {
            json: true,
            urlencoded: { extended: true }
          }
        },
        {
          path: '/',
          authorization: true,
          mappingPolicy: 'restrict',
          use: [cookieParser()],
          onBeforeCall: auditMiddleware,
          onAfterCall: jwtMiddleware,
          aliases: routing.public,
          bodyParsers: {
            json: true,
            urlencoded: { extended: true }
          }
        }
      ],
      onError(req, res, err) {
        let msg = err.message;
        if(Array.isArray(err.data) && err.data.length > 0 && err.data[0].message) {
          msg = err.data[0].message;
        }
        res.setHeader("Content-Type", "text/plain");
        res.writeHead(err.code || 501);
        res.end(msg);
      }
    },
    methods: {
      authorize: authorize(this.settings.auth.enabled)
    },
    started() {
      // do not start listening since its an express middleware
    }
  });

  let replacements = {};
  if(this.settings.web.gaCode) {
    this.logger.info(`GA tracking enabled: ${this.settings.web.gaCode}`);
    replacements['GA:XX-XXXXXXXXX-X'] = this.settings.web.gaCode;
  }

  this.app = express();
  this.app.use(stringReplace(replacements));
  this.app.use((req, res, next) => {
    this.logger.debug(`HTTP ${req.method}: ${req.url}`);
    next();
  });
  let webroot = path.resolve(this.settings.web.webroot || './public_html');
  this.logger.info(`Web root: ${webroot}`);
  this.app.use(express.static(
    webroot,
    { maxAge: 12*60*60*1000, etag: true }
  ));
  this.app.use("/api", svc.express());

  this.app.use(cookieParser());

  if(this.settings.auth.enabled == false) {
    this.logger.warn('Auth is disabled. Everyone can access admin panel. The configuration is not recommended for production purposes');
    this.app.get(`/auth/logout`, (req, res) => {
      res.redirect('/');
    });
  } else {
    configPassport(this.app, this.logger, this.broker, {
      ...this.settings
    });
  }

  let port = this.settings.web.port || 8080;
  let host = this.settings.web.host || '127.0.0.1';
  if(this.server) {
    this.server.close();
    this.server = null;
  }
  this.logger.info(`CORS origin: ${corsOrigin.join(', ')}`)
  this.server = http.Server(this.app);
  this.logger.info('Starting Socket.IO server');
  this.io = IO.listen(this.server, {
    path: '/api/events',
    serveClient: false
  });

  this.server.listen(
    port,
    host,
    () => {
      this.logger.info(`webserver started at http://${host}:${port}`)
    }
  );

  this.io.on("connection", (client) => {
    this.logger.info("Client connected via websocket!");
      client.on("disconnect", () => {
      this.logger.info("Client disconnected");
    });
  });

}
