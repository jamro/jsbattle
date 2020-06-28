const { ValidationError } = require("moleculer").Errors;

module.exports = async function(ctx) {
  const userId = ctx.meta.user ? ctx.meta.user.id : null;
  if(!userId) {
    throw new ValidationError('Not Authorized!', 401);
  }
  let user = await ctx.call('userStore.get', { id: userId });
  if(!user.registered) {
    throw new ValidationError('You must finish registration process to perform that action', 401);
  }
  const challengeId = ctx.params.challengeId
  let response = await ctx.call('challenges.find', {query: {
    userId: userId,
    challengeId: challengeId
  }});
  if(response.length > 0) {
    return response[0];
  }
  return ctx.call('challenges.create', {
    userId: userId,
    challengeId: challengeId
  });
}
