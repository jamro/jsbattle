
module.exports = function(ctx) {
  let topic = ctx.params.topic || 'default';
  if(!this.topics[topic]) {
    this.topics[topic] = [];
  }
  if(this.topics[topic].length == 0) {
    return {
      ok: false,
      topic: topic,
      payload: null,
      queueLength: this.topics[topic].length,
      error: `Topic ${topic} is empty`
    }
  }

  let payload = this.topics[topic].pop();

  return {
    ok: true,
    topic: topic,
    payload: payload,
    queueLength: this.topics[topic].length,
  }
}
