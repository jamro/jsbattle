const _ = require('lodash');
const crypto = require("crypto");

module.exports = function(ctx) {
  ctx.params = _.omit(ctx.params, [
    'createdAt',
    'ownerName',
    'ownerId'
  ]);
  if(ctx.params.code !== undefined) {
    ctx.params.hash = crypto.createHash('md5').update(ctx.params.code).digest("hex");
  }
  return ctx;
}
