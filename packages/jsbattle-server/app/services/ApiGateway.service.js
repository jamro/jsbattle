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

    this.parseServiceSchema({
      name: "apiGateway",
      started() {
        const svc = broker.createService({
          mixins: [ApiService],
          settings: {
            routes: [
              {
                authorization: broker.serviceConfig.auth.enabled,
                path: '/admin',
                mappingPolicy: 'restrict',
                use: [cookieParser()],
                aliases: {
                  "GET allBattleReplays": "battleStore.listAll",
                  "GET whoami": "auth.whoami"
                },
                bodyParsers: {
                  json: true,
                  urlencoded: { extended: true }
                }
              },
              {
                path: '/',
                mappingPolicy: 'restrict',
                use: [cookieParser()],
                aliases: {
                  "GET battleReplay": "battleStore.getReplay",
                  "POST battleReplay": "battleStore.publish"
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
            authorize: authorize(['admin'])
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
        } else {
          configPassport(this.app, this.logger, broker);
        }

        let port = broker.serviceConfig.web.port || 8080;
        let host = broker.serviceConfig.web.host || '127.0.0.1';
        this.app.listen(
          port,
          host,
          () => {
            this.logger.info(`webserver started at http://${host}:${port}`)
          }
        );
      }
    });
  }

}

module.exports = ApiGatewayService;
