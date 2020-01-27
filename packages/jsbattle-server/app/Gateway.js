const ConfigBroker = require('./lib/ConfigBroker.js');
const path = require('path')

class Gateway {

  init(options) {
    return new Promise((resolve) => {
      this.broker = new ConfigBroker(
        {
          namespace: 'jsbattle',
          logLevel: options.loglevel
        },
        options
      );
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
