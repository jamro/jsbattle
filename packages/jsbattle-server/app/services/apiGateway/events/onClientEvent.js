module.exports = function(payload, sender, event) {
  if (this.io) {
    this.logger.debug(`Sending client event: ${event}`);
    this.io.emit("event", {
      event,
      payload
    });
  }
}
