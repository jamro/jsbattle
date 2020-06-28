const ConfigBroker = require('./lib/ConfigBroker.js');
const path = require('path');
const auditMiddleware = require('./lib/auditMiddleware.js').moleculer;
const GATEWAY = 'gateway';
const WORKER = 'worker';

class Node {

  constructor(type) {
    this.type = type || GATEWAY;
  }

  init(options) {
    let clusterName = options.cluster && options.cluster.name ? options.cluster.name : 'jsbattle';
    let transporter;
    if(options.cluster && options.cluster.enabled) {
      options.cluster.transporter = options.cluster.transporter || {};
      options.cluster.transporter.type = options.cluster.transporter.type || 'TCP';
      transporter = {
        type: options.cluster.transporter.type,
        options: options.cluster.transporter.options
      };
    }

    return new Promise((resolve) => {
      this.broker = new ConfigBroker(
        {
          namespace: clusterName,
          metadata: {
            type: this.type
          },
          middlewares: [auditMiddleware],
          nodeID: this.type + "-" + clusterName + '-' + process.pid,
          logLevel: options.loglevel,
          logger: options.logger,
          transporter: transporter,
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
            'apiGateway',
            'battleStore',
            'league',
            'queue',
            'ubdPlayer',
            'userStore',
            'auth',
            'challenges',
            'leagueScheduler',
            'scriptStore',
            'ubdValidator',
            'activityMonitor',
            'stats',
            'node',
          ];
          break;
        case WORKER:
          serviceList = [
            'ubdPlayer',
            'node',
          ];
          break;
        default:
          throw Error('unknown node type: ' + this.type);

      }
      serviceList.forEach((service) => this.broker.loadService(path.resolve(__dirname, 'services', service, `index.js`)));
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
