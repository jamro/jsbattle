const { ValidationError } = require("moleculer").Errors;
const _ = require('lodash');

module.exports = async function(ctx) {
  const userId = ctx.meta.user ? ctx.meta.user.id : null;
  if(!userId) {
    throw new ValidationError('Not Authorized!', 401);
  }

  const fields = [
    "id",
    "ownerId",
    "ownerName",
    "scriptId",
    "scriptName",
    "joinedAt",
    "fights_total",
    "fights_win",
    "fights_lose",
    "fights_error",
    "hash",
    "score",
    "latest",
    "history"
  ];

  let submission = await ctx.call('league.getUserSubmission', {});
  submission = _.pick(submission, fields);

  return {
    submission,
    ranktable: this.ranktable.slice(submission.id, 9)
  }
}
