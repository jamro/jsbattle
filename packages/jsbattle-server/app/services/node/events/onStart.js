const pkgInfo = require('../../../../package.json');

module.exports = function() {
  this.nodes = [];

  const loop = async () => {
    let nodeInfo = this.broker.getLocalNodeInfo();
    let services = nodeInfo.services
      .map((s) => s.name)
      .filter((s) => s.charAt(0) != '$');
    let health = await this.broker.getHealthStatus();
    let info = {
      nodeID: this.broker.nodeID,
      appVersion: pkgInfo.version,
      clusterName: this.settings.clusterName,
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

    this.broker.broadcast("node.echo", { info })
  };
  this.loopCallback = setInterval(loop, 5000 + Math.round(5000*Math.random()));
}
