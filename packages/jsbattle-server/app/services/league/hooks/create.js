const _ = require('lodash');

module.exports = function(ctx) {
  ctx.params.joinedAt = new Date();
  ctx.params.fights_total = 0;
  ctx.params.fights_win = 0;
  ctx.params.fights_lose = 0;
  ctx.params.fights_error = 0;
  ctx.params.score = ctx.params.score || 0;
  ctx.params = _.omit(ctx.params, ['id']);
  return ctx;
}
