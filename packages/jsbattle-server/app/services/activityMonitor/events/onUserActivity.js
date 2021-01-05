module.exports = function(activity) {
    if(!activity.userId || !activity.action) {
      this.logger.debug(`Skipping invalid action: {userId: ${activity.userId}, action: ${activity.action}}`)
    }
    activity.username = activity.username || '';
    activity.role = activity.role || '';
    activity.timestamp = activity.timestamp || new Date();

    this.logger.info(`Activity detected (user: ${activity.username}, role: ${activity.role}, action: '${activity.action}')`)

    this.sessions = this.sessions || [];
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

    this.sessions = this.sessions.filter((s) => new Date().getTime() - s.lastAction.timestamp.getTime() < this.settings.sessionDuration)
  }
