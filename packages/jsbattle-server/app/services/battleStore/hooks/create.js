const _ = require('lodash');

module.exports = function(ctx) {
  let defaultExpires;
  if(ctx.params.expiresIn === undefined) {
    defaultExpires = new Date(new Date().getTime() + this.settings.defaultExpireTime);
  } else {
    defaultExpires = new Date(new Date().getTime() + ctx.params.expiresIn);
  }
  ctx.params.createdAt = new Date();
  ctx.params.expiresAt = ctx.params.expiresAt || defaultExpires;
  ctx.params.meta = ctx.params.meta || {};
  ctx.params.owner = ctx.params.owner || {};
  ctx.params = _.omit(ctx.params, ['id']);
  return ctx;
}
