module.exports = function() {
  this.logger.info('Starting clean up loop at ' + this.settings.cleanupInterval + 'ms')
  this.loop = setInterval(async () => {
    try {
      await this.broker.call('battleStore.cleanup', {})
    } catch(err) {
      this.logger.warn(err)
    }
  }, this.settings.cleanupInterval)
}
