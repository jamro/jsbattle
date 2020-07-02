const _ = require('lodash');

module.exports = function(ctx) {
  ctx.params.registered = false;
  ctx.params.createdAt = new Date();
  ctx.params.lastLoginAt = new Date();
  ctx.params.username = ctx.params.username || ctx.params.email.replace(/@.*$/, '').toLowerCase() || ctx.params.displayName.replace(' ', '').toLowerCase() || 'anonymous';
  ctx.params.displayName = ctx.params.displayName || ctx.params.username || 'Anonymous';
  ctx.params.role = ctx.params.role || 'user';
  ctx.params = _.omit(ctx.params, ['id']);
  return ctx;
}
