const { ServiceBroker } = require("moleculer");
const path = require('path')

class Gateway {

  init(options) {
    return new Promise((resolve) => {
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
