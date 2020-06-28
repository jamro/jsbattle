const Service = require("moleculer").Service;
const pkgInfo = require('../../../package.json');
const getInfo = require('./actions/getInfo.js');
const onNodeEcho = require('./events/onNodeEcho.js');

class NodeService extends Service {

  constructor(broker) {
    super(broker);
    this._broker = broker;
    this.nodes = [];

    this.parseServiceSchema({
      name: "node",
      actions: {
        "getInfo": getInfo.bind(this)
      },
      events: {
        "node.echo": onNodeEcho.bind(this)
      },
      started: () => {
        setInterval(async () => broker.broadcast("node.echo", { info: await this.getNodeInfo() }), 5000 + Math.round(5000*Math.random()))
      }
    });
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
