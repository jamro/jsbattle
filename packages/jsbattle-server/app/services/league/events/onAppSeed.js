const RankTable = require('../lib/RankTable.js');

module.exports = async function() {
  await this.broker.call('league.seedLeague', {})

  this.logger.info('Initializing Rank table');
  let initData = await this.broker.call('league.find', {
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
  if(!this.ranktable ) {
    this.ranktable = new RankTable();
  }
  this.ranktable.init(initData);
  this.logger.info('Rank Table initialized');
}
