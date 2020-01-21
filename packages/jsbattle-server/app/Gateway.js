const { ServiceBroker } = require("moleculer");
const path = require('path')
const _ = require('lodash')
require('dotenv').config();

class Gateway {

  init(options) {
    return new Promise((resolve) => {
      const defaultOptions = {
        "loglevel": "info",
        "data": {
          "path": "./jsbattle-data"
        },
        "web": {
          "webroot": path.resolve(__dirname, "./public"),
          "host": "127.0.0.1",
          "baseUrl": "http://localhost:8080",
          "port": "8080",
          "gaCode": ""
        },
        "auth": {
          "enabled": true,
          "admins": [],
          "providers": []
        }
      };

      // add auth strategioes defined in env vars
      let authStrategies = Object.keys(process.env)
        .filter((keyName) => (/^OAUTH_([A-Z_\-0-9]*)_CLIENT_(SECRET|ID)$/).test(keyName))
        .map((keyName) => keyName.replace(/^OAUTH_([A-Z_\-0-9]*)_CLIENT_(SECRET|ID)$/, "$1"))
      authStrategies = _.uniq(authStrategies);
      authStrategies.forEach((strategyName) => {
        defaultOptions.auth.providers.push({
          name: strategyName.toLowerCase(),
          clientID: process.env[`OAUTH_${strategyName.toUpperCase()}_CLIENT_ID`],
          clientSecret: process.env[`OAUTH_${strategyName.toUpperCase()}_CLIENT_SECRET`]
        });
      });

      options = _.defaultsDeep(options, defaultOptions)
      this.broker = new ServiceBroker({
        namespace: 'jsbattle',
        logLevel: options.loglevel
      });
      this.broker.serviceConfig = options;
      this.broker.loadServices(path.resolve(__dirname, 'services'), '*.service.js');
      resolve();
    });
  }

  start() {
    return new Promise((resolve) => {
      this.broker.start()
        .then(resolve)
        .catch((err) => console.error(`Error occured! ${err.message}`));
    });
  }

}

module.exports = Gateway;
