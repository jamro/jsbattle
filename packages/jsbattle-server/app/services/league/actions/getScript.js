const { ValidationError } = require("moleculer").Errors;

module.exports = async function(ctx) {
  const userId = ctx.meta.user ? ctx.meta.user.id : null;
  if(!userId) {
    throw new ValidationError('Not Authorized!', 401);
  }

  const scriptId = ctx.params.id
  let response = await ctx.call('league.get', {
    id: scriptId,
    fields: [
      "id",
      "ownerName",
      "scriptName",
      "code"
    ]
  });

  return {
    id: response.id,
    scriptName: response.ownerName + '/' + response.scriptName,
    code: response.code
  };
}
