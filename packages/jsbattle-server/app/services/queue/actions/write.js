
module.exports = function(ctx) {
  let topic = ctx.params.topic || 'default';
  let limit = ctx.params.limit || this.settings.hardLimit;
  let payload = ctx.params.payload;

  if(!this.topics[topic]) {
    this.topics[topic] = [];
  }

  if(this.topics[topic].length >= this.settings.hardLimit) {
    return {
      ok: false,
      topic: topic,
      queueLength: this.topics[topic].length,
      error: `Hard limit of ${this.settings.hardLimit} items exceeded for topic ${topic}`
    }
  }

  if(this.topics[topic].length >= limit) {
    return {
      ok: false,
      topic: topic,
      queueLength: this.topics[topic].length,
      error: `Requested limit of ${limit} items exceeded for topic ${topic}`
    }
  }

  this.topics[topic].unshift(payload);

  this.logger.trace(`writting to queue '${topic}'. Length: ${this.topics[topic].length}/${this.settings.hardLimit}` );

  return {
    ok: true,
    topic: topic,
    queueLength: this.topics[topic].length,
    payload: payload
  }

}
