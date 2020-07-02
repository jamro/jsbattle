const validators = require("../../validators");

module.exports = () => ({
  name: "stats",
  actions: {
    "getSummary": require('./actions/getSummary.js'),
    "getUserSummary": {
      params: {
        id: validators.entityId()
      },
      handler: require('./actions/getUserSummary.js')
    }
  }
})
