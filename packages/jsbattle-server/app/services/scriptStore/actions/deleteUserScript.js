const { ValidationError } = require("moleculer").Errors;

module.exports = async function(ctx) {
  const userId = ctx.meta.user ? ctx.meta.user.id : null;
  if(!userId) {
    throw new ValidationError('Not Authorized!', 401);
  }
  const scriptId = ctx.params.id
  // check access
  let response = await ctx.call('scriptStore.get', { id: scriptId });
  if(response.ownerId != userId) {
    throw new ValidationError('Entity not found', 404);
  }
  if(response.namespace != 'user') {
    throw new ValidationError('Entity not found', 404);
  }

  return ctx.call('scriptStore.remove', {id: scriptId})
}
