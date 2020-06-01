const { ServiceBroker } = require("moleculer");
const _ = require('lodash')
const path = require('path')
require('dotenv').config();

class ConfigBroker extends ServiceBroker {

  constructor(options, config = {}, useEnv = true) {
    super(options);
    const defaultConfig = {
      "loglevel": "info",
      "skipEnv": false,
      "data": {
        "adapter": "nedb",
        "path": null
      },
      "web": {
        "webroot": path.resolve(__dirname, "../public"),
        "host": "127.0.0.1",
        "baseUrl": "http://localhost:8080",
        "corsOrigin": [],
        "port": "8080",
        "gaCode": "",
      },
      "auth": {
        "enabled": true,
        "admins": [],
        "providers": []
      },
      "league": {
        "scheduleInterval": 30000,
        "timeLimit": 20000,
        "teamSize": 3,
        "obfuscate": true,
        "historyDuration": 3*24*60*60*1000
      },
      "ubdPlayer": {
        "queueLimit": 2,
        "queueQueryTime": 5000,
        "port": 8899,
        "speed": 1,
        "timeout": 60000
      },
      "battleStore": {
        "defaultExpireTime": 7*24*60*60*1000,
        "cleanupInterval": 60*60*1000,
      }
    };

    // add auth strategies defined in env vars
    if(useEnv && !config.skipEnv) {
      let authStrategies = Object.keys(process.env)
        .filter((keyName) => (/^OAUTH_([A-Z_\-0-9]*)_CLIENT_(SECRET|ID)$/).test(keyName))
        .map((keyName) => keyName.replace(/^OAUTH_([A-Z_\-0-9]*)_CLIENT_(SECRET|ID)$/, "$1"))
      authStrategies = _.uniq(authStrategies);
      authStrategies.forEach((strategyName) => {
        defaultConfig.auth.providers.push({
          name: strategyName.toLowerCase(),
          clientID: process.env[`OAUTH_${strategyName.toUpperCase()}_CLIENT_ID`],
          clientSecret: process.env[`OAUTH_${strategyName.toUpperCase()}_CLIENT_SECRET`]
        });
      });
    }

    if(config.auth && config.auth.providers) {
      config.auth.providers = config.auth.providers.concat(defaultConfig.auth.providers)
    }

    config = _.defaultsDeep(config, defaultConfig)


    this.serviceConfig = config;

  }
}

module.exports = ConfigBroker;
