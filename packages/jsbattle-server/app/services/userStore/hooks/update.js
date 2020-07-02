const _ = require('lodash');

module.exports = function(ctx) {
  ctx.params = _.omit(ctx.params, [
    'createdAt',
    'extUserId',
    'provider'
  ]);
  return ctx;
}
