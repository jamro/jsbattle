const _ = require('lodash');

module.exports = function(ctx) {
  ctx.params = _.omit(ctx.params, ['userId']);
  return ctx;
}
