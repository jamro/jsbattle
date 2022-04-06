const calculateScore = require("../lib/calculateScore.js");

module.exports = async function(ctx) {
  let entity = await this._get(ctx, {
    id: ctx.params.id,
    fields: [
      'id',
      'fights_total',
      'fights_win',
      'fights_lose',
      'fights_error',
      'score'
    ]
  });

  let newScore = calculateScore(
    entity.score,
    ctx.params.winner,
    entity.fights_total,
    entity.fights_win
  );

  let newEntity = {
    id: entity.id,
    fights_total: entity.fights_total + 1,
    fights_win: entity.fights_win + (ctx.params.winner ? 1 : 0),
    fights_lose: entity.fights_lose + (ctx.params.winner ? 0 : 1),
    fights_error: entity.fights_error + (0 - entity.fights_error)*0.2,
    score: Math.round(newScore)
  }

  if(
    newEntity.fights_total > this.settings.cutOffFightCount &&
    newEntity.fights_win < this.settings.cutOffWinRatio * newEntity.fights_total
  ) {
    this.logger.warn(`'${newEntity.ownerName}/${newEntity.scriptName}' won only ${newEntity.fights_win} of ${newEntity.fights_total} fights. Removing from the league...`);
    ctx.call('league.remove', {id: newEntity.id});
    this.ranktable.remove(newEntity.id);
    return;
  }

  this._update(ctx, newEntity);
  this.ranktable.updateScore(
    newEntity.id,
    newEntity.score,
    newEntity.fights_total,
    newEntity.fights_win,
    newEntity.fights_lose
  );
  this.ranktable.updateFail(newEntity.id, newEntity.fights_error);
}
