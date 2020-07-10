module.exports = function(ctx) {
  if(ctx.params.displayName) {
    ctx.params.displayName = ctx.params.displayName.trim()
  }
  return ctx;
}
