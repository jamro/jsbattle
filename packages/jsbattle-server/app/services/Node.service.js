const Service = require("moleculer").Service;
const fs = require('fs');
const pkgInfo = require('../../package.json');

class NodeService extends Service {

  constructor(broker) {
    super(broker);
    this._broker = broker;
    this.nodes = [];

    this.parseServiceSchema({
      name: "node",
      actions: {
        "getInfo": this.getInfo,
      },
      events: {
        "node.echo"(data, sender) {
          this.logger.debug(`echo from node ${sender}`);

          let entry = this.nodes.find((node) => node.nodeID == sender);
          if(entry) {
            entry.timestamp = new Date().getTime();
            entry.info = data.info;
          } else {
            this.nodes.push({
              nodeID: sender,
              timestamp: new Date().getTime(),
              info: data.info
            })
          }
          this.nodes = this.nodes.filter((node) => node.timestamp > new Date().getTime() - 30000);
        }
      },
      started: () => {
        setInterval(async () => broker.broadcast("node.echo", { info: await this.getNodeInfo() }), 5000 + Math.round(5000*Math.random()))
      }
    });
  }

  getInfo() {
    let nodes = this.nodes.map((node) => node.info);
    let allServices = fs
      .readdirSync(__dirname)
      .filter((name) => name.endsWith('.service.js'))
      .map((name) => name.replace(/\.service\.js$/, ''))
      .map((name) => name.charAt(0).toLowerCase() + name.slice(1))

    return {
      nodeCount: nodes.length,
      allServices: allServices,
      nodes: nodes
    };
  }

  async getNodeInfo() {
    let nodeInfo = this._broker.getLocalNodeInfo();
    let services = nodeInfo.services
      .map((s) => s.name)
      .filter((s) => s.charAt(0) != '$');
    let health = await this._broker.getHealthStatus();
    return {
      nodeID: this._broker.nodeID,
      appVersion: pkgInfo.version,
      clusterName: this._broker.serviceConfig.cluster.name,
      hostname: nodeInfo.hostname,
      processUptime: health.process.uptime,
      client: `${health.client.type} ${health.client.langVersion}`,
      cpu: health.cpu,
      memory: health.mem,
      os: {
        uptime: health.os.uptime,
        platform: health.os.platform,
        user: health.os.user.username,
      },
      time: health.time,
      services: services
    }
  }

}

module.exports = NodeService;
