const Service = require("moleculer").Service;

class ActivityMonitor extends Service {

  constructor(broker) {
    super(broker);
    this.sessions = [];
    this.sessionDuration = 15*60*1000;
    this.parseServiceSchema({
      name: "activityMonitor",
      actions: {
        listActiveSessions: this.listActiveSessions
      },
      events: {
        "user.activity": this.processActivity
      }
    });
  }

  processActivity(activity) {
    if(!activity.userId || !activity.action) {
      this.logger.warn(`Skipping nvalid action: {userId: ${activity.userId}, action: ${activity.action}}`)
    }
    activity.username = activity.username || '';
    activity.role = activity.role || '';
    activity.timestamp = activity.timestamp || new Date();

    this.logger.info(`Activity detected (user: ${activity.username}, role: ${activity.role}, action: '${activity.action}')`)

    let session = this.sessions.find((s) => s.userId == activity.userId);
    if(!session) {
      session = {
        userId: activity.userId
      };
      this.sessions.push(session);
    }
    session.username = activity.username;
    session.role = activity.role;
    session.lastAction = {
      service: activity.action,
      uri: activity.uri,
      timestamp: activity.timestamp
    };

    this.sessions = this.sessions.filter((s) => new Date().getTime() - s.lastAction.timestamp.getTime() < this.sessionDuration)
  }

  listActiveSessions() {
    return this.sessions;
  }

}

module.exports = ActivityMonitor;
