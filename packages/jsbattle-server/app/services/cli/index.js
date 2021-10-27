module.exports = () => ({
  name: "cli",
  actions: {
    "dumpDb": require('./actions/dumpDb.js'),
    "restoreDb": require('./actions/restoreDb.js'),
  }
});
