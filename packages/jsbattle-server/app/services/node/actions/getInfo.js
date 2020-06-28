const fs = require('fs');

module.exports = function() {
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
