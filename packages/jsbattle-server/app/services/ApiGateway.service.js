const Service = require("moleculer").Service;
const ApiService = require("moleculer-web");
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const stringReplace = require('../lib/stringReplaceMiddleware.js');
const authorize = require('./apiGateway/authorize.js');
const configPassport = require('./apiGateway/configPassport.js');

class ApiGatewayService extends Service {

  constructor(broker) {
    super(broker);
    let corsOrigin = broker.serviceConfig.web.corsOrigin;
    if(!Array.isArray(corsOrigin)) {
      corsOrigin = [corsOrigin]
    }
    corsOrigin.push(broker.serviceConfig.web.baseUrl)
    this.parseServiceSchema({
      name: "apiGateway",
      started() {
        const svc = broker.createService({
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
                aliases: {
                  "PATCH users/:id": "userStore.update",
                  "REST users": "userStore",
                  "PATCH scripts/:id": "scriptStore.update",
                  "REST scripts": "scriptStore",
                  "PATCH battles/:id": "battleStore.update",
                  "REST battles": "battleStore"
                },
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
                aliases: {
                  "PATCH initData": "userStore.register",
                  "GET scripts": "scriptStore.listUserScripts",
                  "POST scripts": "scriptStore.createUserScript",
                  "PATCH scripts/:id": "scriptStore.updateUserScript",
                  "GET scripts/:id": "scriptStore.getUserScript",
                  "DELETE scripts/:id": "scriptStore.deleteUserScript",
                  "GET challenges": "challenges.listUserChallanges",
                  "GET challenges/:challengeId": "challenges.getUserChallange",
                  "PATCH challenges/:challengeId": "challenges.updateUserChallange",
                },
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
                aliases: {
                  "GET profile": "auth.whoami",
                  "GET authMethods": "auth.getAuthMethods",
                },
                bodyParsers: {
                  json: true,
                  urlencoded: { extended: true }
                }
              }
            ],
            onError(req, res, err) {
              res.setHeader("Content-Type", "text/plain");
              res.writeHead(err.code || 501);
              res.end("Error: " + err.message);
            }
          },
          methods: {
            authorize: authorize(broker.serviceConfig.auth.enabled)
          },
          started() {
            // do not start listening since its an express middleware
          }
        });

        let replacements = {};
        if(broker.serviceConfig.web.gaCode) {
          this.logger.info(`GA tracking enabled: ${broker.serviceConfig.web.gaCode}`);
          replacements['GA:XX-XXXXXXXXX-X'] = broker.serviceConfig.web.gaCode;
        }

        this.app = express();
        this.app.use(stringReplace(replacements));
        this.app.use((req, res, next) => {
          this.logger.debug(`HTTP ${req.method}: ${req.url}`);
          next();
        });
        let webroot = path.resolve(broker.serviceConfig.web.webroot || './public_html');
        this.logger.info(`Web root: ${webroot}`);
        this.app.use(express.static(
          webroot,
          { maxAge: 12*60*60*1000, etag: true }
        ));
        this.app.use("/api", svc.express());

        this.app.use(cookieParser());

        if(broker.serviceConfig.auth.enabled == false) {
          this.logger.warn('Auth is disabled. Everyone can access admin panel. The configuration is not recommended for production purposes');
          this.app.get(`/auth/logout`, (req, res) => {
            res.redirect('/');
          });
        } else {
          configPassport(this.app, this.logger, broker);
        }

        let port = broker.serviceConfig.web.port || 8080;
        let host = broker.serviceConfig.web.host || '127.0.0.1';
        if(this.server) {
          this.server.close();
          this.server = null;
        }
        this.logger.info(`CORS origin: ${broker.serviceConfig.web.corsOrigin.join(', ')}`)
        this.server = this.app.listen(
          port,
          host,
          () => {
            this.logger.info(`webserver started at http://${host}:${port}`)
          }
        );
      },
      stopped() {
        if(this.server) {
          this.server.close();
          this.server = null;
        }
      }
    });
  }

}

module.exports = ApiGatewayService;
