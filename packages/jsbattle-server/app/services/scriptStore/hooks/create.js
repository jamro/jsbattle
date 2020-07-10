const _ = require('lodash');
const crypto = require("crypto");

module.exports = async function(ctx) {
  const userId = ctx.meta.user ? ctx.meta.user.id : '';
  let username = '';
  if(userId) {
    try {
      let user = await ctx.call('userStore.get', { id: userId });
      username = user.username;
    } catch (err) {
      this.logger.warn(err);
    }
  }
  ctx.params.ownerId = ctx.params.ownerId || userId;
  ctx.params.ownerName = ctx.params.ownerName || username;
  ctx.params.namespace = ctx.params.namespace || 'none';
  ctx.params.code = ctx.params.code || '';
  ctx.params.createdAt = new Date();
  ctx.params.modifiedAt = new Date();
  ctx.params.hash = crypto.createHash('md5').update(ctx.params.code).digest("hex");
  ctx.params = _.omit(ctx.params, ['id']);
  return ctx;
}
