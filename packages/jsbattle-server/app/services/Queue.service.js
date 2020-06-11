const Service = require("moleculer").Service;
const validators = require("../validators");

class Queue extends Service {

  constructor(broker) {
    super(broker);

    this.topics = {
      default: []
    }
    this.hardLimit = 100;

    this.parseServiceSchema({
      name: "queue",
      actions: {
        write: {
          params: {
            payload: validators.any(),
            topic: validators.queueTopic({optional: true}),
            limit: {type: "number", positive: true, optional: true}
          },
          handler: this.write
        },
        read: {
          params: {
            topic: validators.queueTopic({optional: true}),
          },
          handler: this.read
        }
      },
    });
  }

  write(ctx) {
    let topic = ctx.params.topic || 'default';
    let limit = ctx.params.limit || this.hardLimit;
    let payload = ctx.params.payload;

    if(!this.topics[topic]) {
      this.topics[topic] = [];
    }

    if(this.topics[topic].length >= this.hardLimit) {
      return {
        ok: false,
        topic: topic,
        queueLength: this.topics[topic].length,
        error: `Hard limit of ${this.hardLimit} items exceeded for topic ${topic}`
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

    return {
      ok: true,
      topic: topic,
      queueLength: this.topics[topic].length,
      payload: payload
    }

  }

  read(ctx) {
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
}

module.exports = Queue;
