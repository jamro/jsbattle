
module.exports = async function() {
  await this.borker.call('league.seedLeague', {})

  this.logger.info('Initializing Rank able');
  let initData = await this.borker.call('league.find', {
    sort: '-score',
    fields: [
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
      "score"
    ]
  });
  this.ranktable.init(initData);
  this.logger.info('Rank Table initialized');
}
