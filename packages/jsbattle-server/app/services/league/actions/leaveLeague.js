const { ValidationError } = require("moleculer").Errors;

module.exports = async function(ctx) {
  const userId = ctx.meta.user ? ctx.meta.user.id : null;
  if(!userId) {
    throw new ValidationError('Not Authorized!', 401);
  }

  let submissions = await ctx.call('league.find', {
    query: {
      ownerId: userId
    }
  });

  let removals = submissions.map((submission) => ctx.call('league.remove', {
      id: submission.id
  }));

  for(let submission of submissions) {
    this.ranktable.remove(submission.id)
  }

  await Promise.all(removals);

  return ctx.call('league.getLeagueSummary', {});
}
