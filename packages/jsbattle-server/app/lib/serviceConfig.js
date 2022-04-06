const _ = require('lodash');
const path = require('path');

let config = {};
config.data = {
  "loglevel": "info",
  "skipEnv": false,
  "cluster": {
    "enabled": false,
    "transporter": {
      "type": "TCP"
    }
  },
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
    "historyDuration": 3*24*60*60*1000,
    "cutOffFightCount": 100,
    "cutOffWinRatio:": 0.05
  },
  "ubdPlayer": {
    "enabled": true,
    "queueLimit": 2,
    "queueQueryTime": 1000,
    "speed": 1,
    "timeout": 60000
  },
  "battleStore": {
    "defaultExpireTime": 7*24*60*60*1000,
    "cleanupInterval": 60*60*1000,
  }
};

config.loadEnv = () => {
  let authStrategies = Object.keys(process.env)
    .filter((keyName) => (/^OAUTH_([A-Z_\-0-9]*)_CLIENT_(SECRET|ID)$/).test(keyName))
    .map((keyName) => keyName.replace(/^OAUTH_([A-Z_\-0-9]*)_CLIENT_(SECRET|ID)$/, "$1"))
  authStrategies = _.uniq(authStrategies);
  authStrategies.forEach((strategyName) => {
    config.data.auth.providers.push({
      name: strategyName.toLowerCase(),
      clientID: process.env[`OAUTH_${strategyName.toUpperCase()}_CLIENT_ID`],
      clientSecret: process.env[`OAUTH_${strategyName.toUpperCase()}_CLIENT_SECRET`]
    });
  });
}

config.extend = (configExtension) => {
  if(configExtension.auth && configExtension.auth.providers) {
    config.data.auth.providers = config.data.auth.providers.concat(configExtension.auth.providers)
  }

  config.data = _.defaultsDeep(configExtension, config.data);
}

module.exports = config;
