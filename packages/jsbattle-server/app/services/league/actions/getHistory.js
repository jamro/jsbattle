
module.exports = async function(ctx) {
  let items = await ctx.call('battleStore.find', {
    sort: '-createdAt',
    limit: 7,
    fields: [
      "id",
      "description",
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
  }))
  return items;
}
