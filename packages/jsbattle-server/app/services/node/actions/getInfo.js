const fs = require('fs');
const path = require('path');

module.exports = function() {
  let nodes = this.nodes.map((node) => node.info);
  let allServices = fs
    .readdirSync(path.resolve(__dirname, '..', '..'))

  return {
    nodeCount: nodes.length,
    allServices: allServices,
    nodes: nodes
  };
}
