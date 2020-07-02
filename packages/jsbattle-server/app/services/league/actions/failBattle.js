
module.exports = async function(ctx) {
  let entity = await this._get(ctx, {
    id: ctx.params.id,
    fields: [
      'id',
      'scriptName',
      'ownerName',
      'fights_error'
    ]
  });
  let newEntity = {
    id: entity.id,
    fights_error: entity.fights_error + (1 - entity.fights_error)*0.1
  }
  this.logger.trace(`Error factor for '${entity.ownerName}/${entity.scriptName}' is ${newEntity.fights_error}`);
  this._update(ctx, newEntity);
  this.ranktable.updateFail(newEntity.id, newEntity.fights_error);

  if(newEntity.fights_error > 0.7) {
    this.logger.warn(`Error factor for '${entity.ownerName}/${entity.scriptName}' exceeded the limit. Removing from the league...`);
    ctx.call('league.remove', {id: newEntity.id});
    this.ranktable.remove(newEntity.id)
  }
}
