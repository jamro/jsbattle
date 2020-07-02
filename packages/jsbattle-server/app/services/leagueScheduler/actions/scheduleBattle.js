
module.exports = async function(ctx) {
  // pick random opponents
  let opponents = await ctx.call('league.pickRandomOpponents', {});

  // build UBD
  let ubd = {
    version: 4,
    rngSeed: Math.random(),
    teamMode: true,
    timeLimit: this.settings.timeLimit,
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
      count: this.settings.teamSize
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
      limit: this.settings.queueLimit
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
