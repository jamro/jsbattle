
module.exports = async function(ctx) {
  let opponents = this.ranktable.pickRandom();
  let opponent1 = await ctx.call('league.get', {id: opponents[0].id})
  let opponent2 = await ctx.call('league.get', {id: opponents[1].id})
  return [
    opponent1,
    opponent2
  ]
}
