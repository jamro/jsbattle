const validators = require("../../validators");

module.exports = () => ({
  name: "queue",
  settings: {
    hardLimit: 100
  },
  actions: {
    write: {
      params: {
        payload: validators.any(),
        topic: validators.queueTopic({optional: true}),
        limit: {type: "number", positive: true, optional: true}
      },
      handler: require('./actions/write.js')
    },
    read: {
      params: {
        topic: validators.queueTopic({optional: true}),
      },
      handler: require('./actions/read.js')
    }
  },
  started: require('./events/onStart.js')
});
