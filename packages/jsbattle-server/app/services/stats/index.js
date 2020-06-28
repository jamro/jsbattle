const Service = require("moleculer").Service;
const validators = require("../../validators");
const getSummary = require('./actions/getSummary.js');
const getUserSummary = require('./actions/getUserSummary.js');

class StatsService extends Service {

  constructor(broker) {
    super(broker);

    this.parseServiceSchema({
      name: "stats",
      actions: {
        "getSummary": getSummary.bind(this),
        "getUserSummary": {
          params: {
            id: validators.entityId()
          },
          handler: getUserSummary.bind(this)
        }
      }
    });
  }
}

module.exports = StatsService;
