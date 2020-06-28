const Service = require("moleculer").Service;
const listActiveSessions = require('./actions/listActiveSessions.js')
const onUserActivity = require('./events/onUserActivity.js')

class ActivityMonitor extends Service {

  constructor(broker) {
    super(broker);
    this.sessions = [];
    this.sessionDuration = 15*60*1000;
    this.parseServiceSchema({
      name: "activityMonitor",
      actions: {
        listActiveSessions: listActiveSessions.bind(this)
      },
      events: {
        "user.activity": onUserActivity.bind(this)
      }
    });
  }
}

module.exports = ActivityMonitor;
