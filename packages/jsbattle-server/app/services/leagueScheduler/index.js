const Service = require("moleculer").Service;
const validators = require("../../validators");
const onBattleCompleted = require('./events/onBattleCompleted.js');
const scheduleBattle = require('./actions/scheduleBattle.js');
const storeBattleResults = require('./actions/storeBattleResults.js');

class LeagueScheduler extends Service {

  constructor(broker) {
    super(broker);
    this.config = broker.serviceConfig.league;
    this.queueLimit = broker.serviceConfig.ubdPlayer.queueLimit;
    this.parseServiceSchema({
      name: "leagueScheduler",
      actions: {
        scheduleBattle: scheduleBattle.bind(this),
        storeBattleResults: {
          params: {
            refData: validators.any(),
            ubd: validators.any(),
            teamList: validators.any(),
          },
          handler: storeBattleResults.bind(this)
        }
      },
      started: () => {
        this.logger.info('Starting scheduling loop at ' + this.config.scheduleInterval + 'ms')
        this.loop = setInterval(async () => {
          try {
            await broker.call('leagueScheduler.scheduleBattle', {})
          } catch(err) {
            this.logger.warn(err)
          }
        }, this.config.scheduleInterval)
      },
      stopped: () => {
        clearInterval(this.loop)
      },
      events: {
        "ubdPlayer.battle.league": onBattleCompleted
      }
    });
  }

}

module.exports = LeagueScheduler;
