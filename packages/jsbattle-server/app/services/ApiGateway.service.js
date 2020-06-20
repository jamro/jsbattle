const Service = require("moleculer").Service;
const ApiService = require("moleculer-web");
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const http = require('http');
const stringReplace = require('../lib/stringReplaceMiddleware.js');
const authorize = require('./apiGateway/authorize.js');
const configPassport = require('./apiGateway/configPassport.js');
const IO = require("socket.io");
const auditMiddleware = require('../lib/auditMiddleware.js').express;
const jwtMiddleware = require('../lib/jwtMiddleware.js');

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
      actions: {

      },
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
                onBeforeCall: auditMiddleware,
                onAfterCall: jwtMiddleware,
                aliases: {
                  "PATCH users/:id": "userStore.update",
                  "GET users": "userStore.list",
                  "GET sessions": "activityMonitor.listActiveSessions",
                  "PATCH scripts/:id": "scriptStore.update",
                  "GET scripts": "scriptStore.list",
                  "PATCH battles/:id": "battleStore.update",
                  "GET battles": "battleStore.list",
                  "GET league": "league.listRankTable",
                  "GET ubdPlayer/info": "ubdPlayer.getInfo",
                  "GET info": "node.getInfo"
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
                onBeforeCall: auditMiddleware,
                onAfterCall: jwtMiddleware,
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
                  "GET league/": "league.getLeagueSummary",
                  "GET league/replay/:id": "battleStore.get",
                  "GET league/submission": "league.getUserSubmission",
                  "GET league/ranktable": "league.getUserRankTable",
                  "GET league/scripts/:id": "league.getScript",
                  "PATCH league/submission": "league.joinLeague",
                  "DELETE league/submission": "league.leaveLeague",
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
                onBeforeCall: auditMiddleware,
                onAfterCall: jwtMiddleware,
                aliases: {
                  "GET profile": "auth.whoami",
                  "GET authMethods": "auth.getAuthMethods",
                  "GET leaguePreview": "league.getHistory",
                  "GET leaguePreview/replay/:id": "battleStore.get"
                },
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

      },
      events: {
        "client.**"(payload, sender, event) {
          if (this.io) {
            this.logger.debug(`Sending client event: ${event}`);
            this.io.emit("event", {
              event,
              payload
            });
          }
        },
        "worker.echo"(payload, sender, event) {
          console.log('EVT', sender, event);
        }
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
