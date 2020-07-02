module.exports = () => ({
  name: "activityMonitor",
  settings: {
    sessionDuration: 15*60*1000
  },
  actions: {
    listActiveSessions: require('./actions/listActiveSessions.js')
  },
  events: {
    "user.activity": require('./events/onUserActivity.js')
  },
  started: require('./events/onStart.js')
});
