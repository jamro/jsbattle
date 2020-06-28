const { ValidationError } = require("moleculer").Errors;

module.exports = async function(ctx) {
  const userId = ctx.meta.user ? ctx.meta.user.id : null;
  if(!userId) {
    throw new ValidationError('Not Authorized!', 401);
  }

  let result = await ctx.call('scriptStore.list', {
    query: {
      ownerId: userId,
      namespace: 'user'
    },
    fields: [
      "id",
      "ownerId",
      "ownerName",
      "scriptName",
      "createdAt",
      "modifiedAt"
    ]
  });
  return result.rows;
}
