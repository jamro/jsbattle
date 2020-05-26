const Service = require("moleculer").Service;

class LeagueScheduler extends Service {

  constructor(broker) {
    super(broker);
    this.config = broker.serviceConfig.league;
    this.queueLimit = broker.serviceConfig.ubdPlayer.queueLimit;
    this.parseServiceSchema({
      name: "leagueScheduler",
      actions: {
        scheduleBattle: this.scheduleBattle,
        storeBattleResults: this.storeBattleResults
      },
      dependencies: [
        'ubdPlayer',
        'league'
      ],
      started: () => {
        this.logger.info('Starting scheduling loop at ' + this.config.scheduleInterval + 'ms')
        this.loop = setInterval(async () => {
          try {
            let queueLength = await broker.call('ubdPlayer.getQueueLength', {});
            if(queueLength >= this.queueLimit) {
              this.logger.debug(`ubdPlayer queue: ${queueLength}/${this.queueLimit}, skipping...`);
              return;
            }
            this.logger.debug(`ubdPlayer queue: ${queueLength}/${this.queueLimit}, Scheduling next battle... `);
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
        "ubdPlayer.battle.league": async (ctx) => {
          this.logger.debug('Battle results received');
          if(ctx.params.error) {
            this.logger.warn('Battle failed between: ' + Object.keys(ctx.params.refData).join(' and '));
            return;
          }
          await ctx.call('leagueScheduler.storeBattleResults', {
            refData: ctx.params.refData,
            teamList: ctx.params.teamList
          });
        }
      }
    });
  }

  async storeBattleResults(ctx) {

    let refData = ctx.params.refData;

    let teamList = ctx.params.teamList;
    if(!teamList || teamList.length != 2) {
      throw new Error('teamList must have exactly 2 elements');
    }
    teamList = teamList.map((team) => {
      if(!refData || !refData[team.name]) {
        throw new Error('no team mapping in refData for: ' + team.name);
      }
      return {
        id: refData[team.name],
        name: team.name,
        battleScore: team.score
      }
    });

    let winner = teamList.reduce((winner, current) => {
      if(current.score > winner.score) {
        return current;
      } else {
        return winner;
      }
    }, teamList[0]);

    let updateCalls = teamList.map((team) => new Promise(async (resolve) => {
      try {
        await ctx.call('league.updateRank', {
          id: team.id,
          name: team.name,
          battleScore: team.battleScore,
          winner: team == winner
        });
      } catch (err) {
        this.logger.warn('Unable to store battle results of ' + team.name + ': ' + err.message);
      }
      resolve();
    }));
    await Promise.all(updateCalls)

  }

  async scheduleBattle(ctx) {
    // pick random opponents
    let opponents = await ctx.call('league.pickRandomOpponents', {});

    // build UBD
    let ubd = {
      version: 3,
      rngSeed: Math.random(),
      teamMode: true,
      timeLimit: this.config.timeLimit,
      aiList: []
    };

    let i;
    for(i=0; i < this.config.teamSize; i++) {
      for(let opponent of opponents) {
        ubd.aiList.push({
          name: opponent.ownerName === 'jsbattle' ? opponent.scriptName : opponent.ownerName,
          team: opponent.ownerName + '/' + opponent.scriptName,
          code: opponent.code,
          initData: null,
          useSandbox: true,
          executionLimit: 100
        });
      }
    }

    this.logger.debug(`Scheduling battle ${opponents[0].scriptName} vs ${opponents[1].scriptName}`)

    try {
      let refData = {};
      refData[opponents[0].ownerName + '/' + opponents[0].scriptName] = opponents[0].id;
      refData[opponents[1].ownerName + '/' + opponents[1].scriptName] = opponents[1].id;
      await ctx.call('ubdPlayer.scheduleBattle', {
        ubd: ubd,
        event: 'league',
        refData: refData
      });
    } catch(err) {
      this.logger.debug('Unable to schedule battle due to: ' + err.message)
    }

  }


}

module.exports = LeagueScheduler;
