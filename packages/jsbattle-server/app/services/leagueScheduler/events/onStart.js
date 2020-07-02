
module.exports = function() {
  this.logger.info('Starting scheduling loop at ' + this.settings.scheduleInterval + 'ms')
  this.loop = setInterval(async () => {
    try {
      await this.broker.call('leagueScheduler.scheduleBattle', {})
    } catch(err) {
      this.logger.warn(err)
    }
  }, this.settings.scheduleInterval)
}
