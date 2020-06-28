const { ValidationError } = require("moleculer").Errors;

module.exports = async function(ctx) {
  const userId = ctx.meta.user ? ctx.meta.user.id : null;
  if(!userId) {
    throw new ValidationError('Not Authorized!', 401);
  }
  let result = await ctx.call('challenges.list', {
    query: {
      userId: userId
    },
    fields: [
      "challengeId",
      "completed"
    ]
  });
  return result.rows;
}
