const { ValidationError } = require("moleculer").Errors;
const path = require('path');
const fs = require('fs').promises;

const dataServices = [
  'battleStore',
  'challenges',
  'league',
  'scriptStore',
  'userStore'
]

module.exports = async function(ctx) {
  const {params} = ctx;
  if(!params.dumpPath) {
    throw new ValidationError('dumpPath parameter is required', 400);
  }
  const dest = path.resolve(params.dumpPath);

  const stats = {};

  for(let service of dataServices) {
    this.logger.info(`Dumping data of '${service}' service`);

    let serviceDest = path.join(dest, service);
    this.logger.debug(`Creating '${service}' service dump location at ${serviceDest}`);
    await fs.mkdir(serviceDest, { recursive: true });

    this.logger.debug(`reading entities of '${service}'`);
    const entities = await ctx.call(service + '.find');
    this.logger.debug(`${entities.length} entities of '${service}' found`);
    stats[service] = entities.length;

    for(let entity of entities) {
      entity._id = entity.id;
      delete entity.id;
      let entityDest = path.join(serviceDest, entity._id + ".json");

      this.logger.trace(`Dumping '${service}' entity to ${entityDest}`);
      await fs.writeFile(entityDest, JSON.stringify(entity));
    }
    this.logger.info(`${entities.length} entities of '${service}' dumped`);
  }

  return {
    entities: stats,
    dumpPath: dest
  };
}
