const DbService = require("moleculer-db");

module.exports = {
  name: "ExtendedDbService",
  mixins: [DbService],
  actions: {
    dumpData: function() {
      return this._find()
    },
    restoreEntity: async function(ctx) {
      const entity = ctx.params;
      const matchingEntities = await this._find(ctx, {query: {_id: entity._id}});
      await Promise.all(matchingEntities.map((item) => this._remove(ctx, {id: item.id})));
      await this._create(ctx, entity)
    }
  }
}
