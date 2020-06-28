const { ValidationError } = require("moleculer").Errors;

module.exports = async function(ctx) {
  const userId = ctx.meta.user ? ctx.meta.user.id : null;
  if(!userId) {
    throw new ValidationError('Not Authorized!', 401);
  }

  let leagueEntry = await ctx.call('league.find', {
    query: {
      ownerId: userId
    },
    limit: 1
  });

  if(leagueEntry.length === 0) {
    return {}
  }
  leagueEntry = leagueEntry[0];
  let items = await ctx.call('battleStore.find', {
    query: {
      owner: {$in: [leagueEntry.id]}
    },
    sort: '-createdAt',
    limit: 10,
    fields: [
      "id",
      "meta",
      "createdAt"
    ]
  });
  items = items.map((item) => ({
    id: item.id,
    createdAt: item.createdAt,
    players: item.meta.map((player) => ({
      id: player.id,
      name: player.name,
      winner: player.winner
    }))
  }));
  leagueEntry.history = items;

  leagueEntry.latest = true;
  try {
    let script = await ctx.call('scriptStore.getUserScript', { id: leagueEntry.scriptId});
    if(script && script.hash !== leagueEntry.hash) {
      leagueEntry.latest = false;
    }
  } catch (err) {
    this.logger.debug('Reference script not found')
  }

  return leagueEntry;
}
