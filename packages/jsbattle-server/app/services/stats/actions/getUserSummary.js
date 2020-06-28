module.exports = async function(ctx) {
  const userId = ctx.params.id;
  let account = await ctx.call('userStore.get', {id: userId});
  let scripts = await ctx.call('scriptStore.find', {
    query: {
      ownerId: userId, namespace: 'user'
    },
    fields: [
      'id',
      'scriptName',
      'createdAt',
      'modifiedAt',
      'hash'
    ]
  });
  let league = await ctx.call('league.find', {
    query: {
      ownerId: userId
    },
    fields: [
      'id',
      'scriptId',
      'scriptName',
      'joinedAt',
      'fights_total',
      'fights_win',
      'fights_lose',
      'fights_error',
      'score'
    ]
  });
  league = league.length ? league[0] : null;
  let battles = [];
  if(league) {
    battles = await ctx.call('battleStore.find', {
      query: {
        owner: {$in: [league.id]}
      },
      sort: '-createdAt',
      fields: [
        "id",
        "meta",
        "description",
        "createdAt",
        "expiresAt"
      ]
    });
  }

  let challenges = await ctx.call('challenges.find', {
    query: {
      userId,
      completed: true
    },
    fields: [
      'challengeId',
      'modifiedAt'
    ]
  })

  return {
    account,
    scripts,
    league,
    battles,
    challenges
  }
}
