
module.exports = function(data, sender) {
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
