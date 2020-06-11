const ConfigBroker = require('./lib/ConfigBroker.js');
const path = require('path')

class Worker {

  init(options) {
    return new Promise((resolve) => {
      this.broker = new ConfigBroker(
        {
          namespace: 'jsbattle',
          nodeID: "worker-" + process.pid,
          logLevel: options.loglevel,
          transporter: "TCP",
          circuitBreaker: {
              enabled: true,
              threshold: 0.5,
              minRequestCount: 20,
              windowTime: 60,
              halfOpenTime: 5 * 1000,
              check: (err) => err && err.code >= 500
          }
        },
        options
      );
      this.broker.loadServices(path.resolve(__dirname, 'services'), 'UbdPlayer.service.js');
      resolve();
    });
  }

  start() {
    return new Promise((resolve) => {
      this.broker.start()
        .then(() => this.broker.broadcast('app.seed', {}))
        .then(resolve)
        .catch((err) => console.error(`Error occured! ${err.message}`));
    });
  }

  stop() {
    return new Promise((resolve) => {
      this.broker.stop()
        .then(resolve)
        .catch((err) => console.error(`Error occured! ${err.message}`));
    });
  }

}

module.exports = Worker;
