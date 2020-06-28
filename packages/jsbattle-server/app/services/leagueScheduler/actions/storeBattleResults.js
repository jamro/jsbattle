
module.exports = async function(ctx) {
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
