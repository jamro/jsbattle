const ConfigBroker = require('./lib/ConfigBroker.js');
const path = require('path');

const GATEWAY = 'gateway';
const WORKER = 'worker';

class Node {

  constructor(type) {
    this.type = type || GATEWAY;
  }

  init(options) {
    let clusterName = options.clusterName || 'jsbattle';
    return new Promise((resolve) => {
      this.broker = new ConfigBroker(
        {
          namespace: clusterName,
          metadata: {
            type: this.type
          },
          nodeID: this.type + "-" + clusterName + '-' + process.pid,
          logLevel: options.loglevel,
          transporter: options.clusterName ? "TCP" : undefined,
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
      let serviceList = [];
      switch(this.type) {
        case GATEWAY:
          serviceList = [
            'ApiGateway',
            'BattleStore',
            'League',
            'Queue',
            'UbdPlayer',
            'UserStore',
            'Auth',
            'Challenges',
            'LeagueScheduler',
            'ScriptStore',
            'UbdValidator',
          ];
          break;
        case WORKER:
          serviceList = ['UbdPlayer'];
          break;
        default:
          throw Error('unknown node type: ' + this.type);

      }
      serviceList.forEach((service) => this.broker.loadService(path.resolve(__dirname, 'services', `${service}.service.js`)));
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

module.exports = Node;
