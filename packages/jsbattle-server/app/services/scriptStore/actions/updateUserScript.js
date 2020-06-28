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

  let updateData = {
    id: scriptId,
    modifiedAt: new Date()
  }
  if(ctx.params.scriptName) {
    updateData.scriptName = ctx.params.scriptName;
    // check whether name is unique
    response = await ctx.call('scriptStore.find', {query: {
      ownerId: userId,
      scriptName: ctx.params.scriptName
    }})
    if(response.length > 0) {
      throw new ValidationError('script name must be unique', 401);
    }
  }
  if(ctx.params.code) {
    updateData.code = ctx.params.code;
  }

  return ctx.call('scriptStore.update', updateData);
}
