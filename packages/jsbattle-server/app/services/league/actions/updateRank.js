const calculateScore = require("../lib/calculateScore.js");

module.exports = async function(ctx) {
  let entity = await this._get(ctx, {
    id: ctx.params.id,
    fields: [
      'id',
      'fights_total',
      'fights_win',
      'fights_lose',
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
    score: Math.round(newScore)
  }
  this._update(ctx, newEntity);
  this.ranktable.updateScore(
    newEntity.id,
    newEntity.score,
    newEntity.fights_total,
    newEntity.fights_win,
    newEntity.fights_lose
  );
}
