module.exports = (config) => ({
  name: "node",
  settings: {
    clusterName: config.cluster.name
  },
  actions: {
    "getInfo": require('./actions/getInfo.js')
  },
  events: {
    "node.echo": require('./events/onNodeEcho.js')
  },
  started: require('./events/onStart.js'),
  stopped: require('./events/onStop.js')
});
