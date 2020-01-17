const Service = require("moleculer").Service;
const ApiService = require("moleculer-web");
const express = require('express');
const path = require('path');
const stringReplace = require('../lib/stringReplaceMiddleware.js');

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
                path: '/',
                mappingPolicy: 'restrict',
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

  started() {
    this.app = express();
    this.app.use("/api", this.express());
    this.app.listen(3000);
  }

}

module.exports = ApiGatewayService;
