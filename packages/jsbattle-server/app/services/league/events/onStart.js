const RankTable = require('../lib/RankTable.js');

module.exports = function() {
  if(!this.ranktable ) {
    this.ranktable = new RankTable();
  }

}
