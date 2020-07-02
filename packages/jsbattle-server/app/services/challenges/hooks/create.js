const _ = require('lodash');

module.exports = function(ctx) {
  const userId = ctx.meta.user ? ctx.meta.user.id : '';
  ctx.params.userId = ctx.params.userId || userId;
  ctx.params.completed = false;
  ctx.params.code = "importScripts('lib/tank.js');\n\n// Don't know where to start?\n// Read Getting Started in \"Docs\" section \n\ntank.init(function(settings, info) {\n\t// initialize tank here\n  \n});\n\ntank.loop(function(state, control) {\n\t// write your tank logic here\n  \n});\n\n\n";
  ctx.params.modifiedAt = new Date();
  ctx.params = _.omit(ctx.params, ['id']);
  return ctx;
}
