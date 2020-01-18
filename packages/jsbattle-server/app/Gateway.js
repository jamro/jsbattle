const { ServiceBroker } = require("moleculer");
const path = require('path')
const _ = require('lodash')

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
          "port": "8080",
          "gaCode": ""
        }
      };
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
