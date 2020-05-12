module.exports = async (ctx) => {
  let count = await ctx.call('league.count', {});
  if(count <= 1) {
    throw new Error('no opponents found for the league match')
  }
  let rand1 = 0.3*Math.random() + 0.7*Math.random()*Math.random();
  let rand2 = 0.3*Math.random() + 0.7*Math.random()*Math.random();
  let index1 = Math.floor(rand1*count);
  let index2 = Math.floor(rand2*(count-1));
  if(index2 >= index1) {
    index2++;
  }
  let query = {
    sort: 'fights_total',
    limit: 1
  }
  query.offset = index1;
  let opponent1 = await ctx.call('league.find', query)
  query.offset = index2;
  let opponent2 = await ctx.call('league.find', query)

  if(opponent1.length === 0 || opponent2.length === 0 ) {
    throw new Error('no opponents found for the league match')
  }
  opponent1 = opponent1[0];
  opponent2 = opponent2[0];

  return [
    opponent1,
    opponent2
  ]
}
