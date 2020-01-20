const Service = require("moleculer").Service;
const ApiService = require("moleculer-web");
const express = require('express');
const path = require('path');
const stringReplace = require('../lib/stringReplaceMiddleware.js');
const { UnAuthorizedError, ERR_NO_TOKEN, ERR_INVALID_TOKEN } = require("moleculer-web").Errors;

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
                authorization: true,
                path: '/admin',
                mappingPolicy: 'restrict',
                aliases: {
                  "GET allBattleReplays": "battleStore.listAll",
                },
                bodyParsers: {
                  json: true,
                  urlencoded: { extended: true }
                }
              },
              {
                path: '/',
                mappingPolicy: 'restrict',
                aliases: {
                  "GET battleReplay": "battleStore.getReplay",
                  "POST battleReplay": "battleStore.publish",
                  "POST login": "auth.login"
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
            async authorize(ctx, route, req) {
              let auth = req.headers["authorization"];
              if (auth && auth.startsWith("Bearer ")) {
                let token = auth.slice(7);
                try {
                  let user = await ctx.call('auth.resolveToken', {token});
                  ctx.meta.user = user; // eslint-disable-line require-atomic-updates
                } catch (err) {
                  return Promise.reject(new UnAuthorizedError(ERR_INVALID_TOKEN));
                }
              } else {
                return Promise.reject(new UnAuthorizedError(ERR_NO_TOKEN));
              }
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
