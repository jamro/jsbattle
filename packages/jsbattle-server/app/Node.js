const { ServiceBroker } = require("moleculer");
const path = require('path');
const auditMiddleware = require('./lib/auditMiddleware.js').moleculer;
const serviceConfig = require('./lib/serviceConfig.js');
require('dotenv').config();

const GATEWAY = 'gateway';
const WORKER = 'worker';
const CLI_DB = 'cli_db';

class Node {

  constructor(type) {
    this.type = type || GATEWAY;
  }

  init(options) {
    options = options || {};
    // add auth strategies defined in env vars
    if(!options.skipEnv) {
      serviceConfig.loadEnv();
    }
    serviceConfig.extend(options);

    let clusterName = serviceConfig.data.cluster && serviceConfig.data.cluster.name ? serviceConfig.data.cluster.name : 'jsbattle';
    let transporter;
    if(serviceConfig.data.cluster && serviceConfig.data.cluster.enabled) {
      serviceConfig.data.cluster.transporter = serviceConfig.data.cluster.transporter || {};
      serviceConfig.data.cluster.transporter.type = serviceConfig.data.cluster.transporter.type || 'TCP';
      transporter = {
        type: serviceConfig.data.cluster.transporter.type,
        options: serviceConfig.data.cluster.transporter.options
      };
    }

    return new Promise((resolve) => {
      this.broker = new ServiceBroker(
        {
          namespace: clusterName,
          metadata: {
            type: this.type
          },
          middlewares: [auditMiddleware],
          nodeID: this.type + "-" + clusterName + '-' + process.pid,
          logLevel: serviceConfig.data.loglevel,
          logger: serviceConfig.data.logger,
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
        serviceConfig.data
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
        case CLI_DB:
          serviceList = [
            'cli',
            'battleStore',
            'challenges',
            'league',
            'scriptStore',
            'userStore',
            'ubdValidator',
          ];
          break;
        default:
          throw Error('unknown node type: ' + this.type);

      }
      serviceList.forEach((service) => {
        let schemaBuilder = require(path.resolve(__dirname, 'services', service, `index.js`));
        this.broker.createService(schemaBuilder(serviceConfig.data));
      });
      resolve();
    });
  }

  start() {
    return new Promise((resolve) => {

      this.broker.start()
        .then(() => this.broker.broadcast('app.seed', {}))
        .then(resolve)
        .catch((err) => console.error(`Error occured during starting the node! ${err.message}`));
    });
  }

  waitForApi() {
    return this.broker.waitForServices('apiGateway');
  }

  stop() {
    return new Promise((resolve) => {
      this.broker.stop()
        .then(resolve)
        .catch((err) => console.error(`Error occured during stopping the node! ${err.message}`));
    });
  }

}

module.exports = Node;
