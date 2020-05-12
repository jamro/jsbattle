module.exports = async (ctx, logger) => {
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
  let result1 = teamList[0].winner ? 1 : 0
  let result2 = teamList[1].winner ? 1 : 0
  let expectedResult = 1 / (1 + Math.pow(10, (score1 - score2)/400));
  score1 = score1 + getK(score1) * (result1 - expectedResult);
  score2 = score2 + getK(score2) * (result2 - (1 - expectedResult));
  teamList[0].entity.score = Math.max(100, Math.round(score1));
  teamList[1].entity.score = Math.max(100, Math.round(score2));

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
      logger.warn('unable to update league entry. Entry not found')
    }
    resolve();
  }));
  Promise.all(updateCalls);
}

function getK(score) {
  if(score > 3000) return 4
  if(score > 2700) return 8
  if(score > 2400) return 16
  if(score > 2100) return 24
  return 32;
}
