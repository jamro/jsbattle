const Service = require("moleculer").Service;
const validators = require("../validators");

class LeagueScheduler extends Service {

  constructor(broker) {
    super(broker);
    this.config = broker.serviceConfig.league;
    this.queueLimit = broker.serviceConfig.ubdPlayer.queueLimit;
    this.parseServiceSchema({
      name: "leagueScheduler",
      actions: {
        scheduleBattle: this.scheduleBattle,
        storeBattleResults: {
          params: {
            refData: validators.any(),
            ubd: validators.any(),
            teamList: validators.any(),
          },
          handler: this.storeBattleResults
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
        "ubdPlayer.battle.league": async (ctx) => {
          this.logger.debug('Battle results received');
          if(ctx.params.error) {
            let details = ctx.params.refData ? Object.keys(ctx.params.refData).join(' and ') : "UNKNOWN"
            this.logger.warn('Battle failed between: ' + details);
            return;
          }
          try {
            await ctx.call('leagueScheduler.storeBattleResults', {
              refData: ctx.params.refData,
              teamList: ctx.params.teamList,
              ubd: ctx.params.ubd
            });
          } catch(err) {
            this.logger.warn(err);
          }
        }
      }
    });
  }

  async storeBattleResults(ctx) {
    let refData = ctx.params.refData;
    let ubd = JSON.stringify(ctx.params.ubd);

    let teamList = ctx.params.teamList;
    if(!teamList || teamList.length != 2) {
      throw new Error('teamList must have exactly 2 elements');
    }

    let winner = teamList.reduce((best, current) => {
      if(current.score > best.score) {
        return current;
      } else {
        return best;
      }
    }, teamList[0]);
    let loser = teamList.reduce((worst, current) => {
      if(current.score < worst.score) {
        return current;
      } else {
        return worst;
      }
    }, teamList[0]);
    if(winner == loser) {
      winner = null;
    }

    teamList = teamList.map((team) => {
      if(!refData || !refData[team.name]) {
        throw new Error('no team mapping in refData for: ' + team.name);
      }
      return {
        id: refData[team.name],
        name: team.name,
        battleScore: team.score,
        winner: team == winner
      }
    });

    this.logger.info('Battle result: ' + teamList.map((t) => `${t.name} (${t.battleScore.toFixed(2)})`).join(' vs '))

    let description = teamList.map((t) => t.name).join(' vs ').substring(0, 128);
    await ctx.call('battleStore.create', {
      ubd: ubd,
      expiresIn: this.config.historyDuration,
      description: description,
      meta: teamList,
      owner: Object.values(refData)
    });

    let updateCalls = teamList.map((team) => new Promise(async (resolve) => {
      try {
        await ctx.call('league.updateRank', {
          id: team.id,
          name: team.name,
          battleScore: team.battleScore,
          winner: team.winner
        });
      } catch (err) {
        this.logger.warn('Unable to store battle results of ' + team.name + ': ' + err.message);
      }
      resolve();
    }));
    await Promise.all(updateCalls)

    ctx.broadcast('client.league.battleCompleted', {});
  }

  async scheduleBattle(ctx) {
    // pick random opponents
    let opponents = await ctx.call('league.pickRandomOpponents', {});

    // build UBD
    let ubd = {
      version: 4,
      rngSeed: Math.random(),
      teamMode: true,
      timeLimit: this.config.timeLimit,
      aiList: []
    };

    for(let opponent of opponents) {
      ubd.aiList.push({
        name: opponent.ownerName + '/' + opponent.scriptName,
        team: opponent.ownerName + '/' + opponent.scriptName,
        code: opponent.code,
        initData: null,
        useSandbox: true,
        executionLimit: 100,
        count: this.config.teamSize
      });
    }

    try {
      let refData = {};
      refData[opponents[0].ownerName + '/' + opponents[0].scriptName] = opponents[0].id;
      refData[opponents[1].ownerName + '/' + opponents[1].scriptName] = opponents[1].id;
      let queueResult = await ctx.call('queue.write', {
        payload: {
          ubd: ubd,
          event: 'league',
          refData: refData
        },
        topic: 'ubdPlayer',
        limit:this.queueLimit
      });
      if(queueResult.ok) {
        this.logger.info(`Scheduling battle ${opponents[0].scriptName} vs ${opponents[1].scriptName}`);
      } else {
        this.logger.debug('Unable to schedule battle: ' + queueResult.error);
      }
    } catch(err) {
      this.logger.debug('Unable to schedule battle due to: ' + err.message)
    }

  }

}

module.exports = LeagueScheduler;
