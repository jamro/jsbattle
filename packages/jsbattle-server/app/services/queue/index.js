const Service = require("moleculer").Service;
const validators = require("../../validators");

const read = require('./actions/read.js');
const write = require('./actions/write.js');

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
          handler: write.bind(this)
        },
        read: {
          params: {
            topic: validators.queueTopic({optional: true}),
          },
          handler: read.bind(this)
        }
      },
    });
  }

}

module.exports = Queue;
