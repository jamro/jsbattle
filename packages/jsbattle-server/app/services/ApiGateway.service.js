const Service = require("moleculer").Service;
const ApiService = require("moleculer-web");
const express = require('express');
const path = require('path');
const stringReplace = require('../lib/stringReplaceMiddleware.js');

class ApiGatewayService extends Service {

  constructor(broker) {
    super(broker);

    const config = broker.serviceConfig;

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
        if(config.gaCode) {
          this.logger.info(`GA tracking enabled: ${config.gaCode}`);
          replacements['GA:XX-XXXXXXXXX-X'] = config.gaCode;
        }

        this.app = express();
        this.app.use(stringReplace(replacements));
        this.app.use(express.static(
          path.resolve(config.webroot || './public_html'),
          { maxAge: 12*60*60*1000, etag: true }
        ));
        this.app.use("/api", svc.express());
        this.app.listen(
          config.port,
          config.host,
          () => {
            this.logger.info(`webserver started at http://${config.host}:${config.port}`)
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
