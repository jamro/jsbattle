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
    function getK(score) {
      if(score > 3000) return 4
      if(score > 2700) return 8
      if(score > 2400) return 16
      if(score > 2100) return 24
      return 32;
    }

    let refData = ctx.params.refData;

    let teamList = ctx.params.teamList;
    if(!teamList || teamList.length != 2) {
      throw new Error('teamList must have exactly 2 elements');
    }

    let winner = teamList.reduce((winner, current) => {
      if(current.score > winner.score) {
        return current;
      } else {
        return winner;
      }
    }, teamList[0]);

    teamList = teamList.map((team) => {
      if(!refData || !refData[team.name]) {
        throw new Error('no team mapping in refData for: ' + team.name);
      }
      return {
        id: refData[team.name],
        name: team.name,
        score: team.score,
        winner: team == winner
      }
    });

    let battleSummary = teamList.map((t) => {
      if (t.winner) {
        return `${t.name} (winner)`
      } else {
        return t.name
      }
    }).join(' vs ');
    this.logger.info(`Storing results of ${battleSummary}`);

    // get current state of entity
    let existingEntries = [];
    let getCalls = teamList.map((team) => new Promise(async (resolve) => {
      existingEntries.push(await ctx.call('league.get', {
        id: team.id,
        fields: [
          'id',
          'ownerName',
          'scriptName',
          'fights_total',
          'fights_win',
          'fights_lose',
          'score'
        ]
      }));
      resolve();
    }));
    await Promise.all(getCalls)
    teamList = teamList.map((team) => ({
      ...team,
      entity: existingEntries.find((entry) => entry.id == team.id)
    }))

    // update entities
    teamList = teamList.map((team) => ({
      ...team,
      entity: {
        ...team.entity,
        fights_total: team.entity.fights_total + 1,
        fights_win: team.entity.fights_win + (team.winner ? 1 : 0),
        fights_lose: team.entity.fights_lose + (team.winner ? 0 : 1),
      }
    }));

    // calculate Elo score
    let score1 = teamList[0].entity.score;
    let score2 = teamList[1].entity.score;
    let oldScore1 = score1;
    let oldScore2 = score2;
    let result1 = teamList[0].winner ? 1 : 0
    let result2 = teamList[1].winner ? 1 : 0
    let expectedResult = 1 / (1 + Math.pow(10, (score1 - score2)/400));
    score1 = score1 + getK(score1) * (result1 - expectedResult);
    score2 = score2 + getK(score2) * (result2 - (1 - expectedResult));
    teamList[0].entity.score = Math.max(100, Math.round(score1));
    teamList[1].entity.score = Math.max(100, Math.round(score2));

    this.logger.debug(`Score of ${teamList[0].name}: ${oldScore1} -> ${teamList[0].entity.score}`)
    this.logger.debug(`Score of ${teamList[1].name}: ${oldScore2} -> ${teamList[1].entity.score}`)

    let updateCalls = teamList.map((team) => ctx.call('league.update', {
      id: team.entity.id,
      fights_total: team.entity.fights_total,
      fights_win: team.entity.fights_win,
      fights_lose: team.entity.fights_lose,
      score: team.entity.score
    }));
    updateCalls = updateCalls.map((callback) => new Promise(async (resolve) => {
      try {
        await callback;
      } catch (err) {
        this.logger.warn('unable to update league entry. Entry not found')
      }
      resolve();
    }));
    Promise.all(updateCalls);
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
