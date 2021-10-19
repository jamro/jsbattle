const { ValidationError } = require("moleculer").Errors;
const path = require('path');
const fs = require('fs').promises;

module.exports = async function(ctx) {
  const {params} = ctx;
  if(!params.dumpPath) {
    throw new ValidationError('dumpPath parameter is required', 400);
  }
  const dumpPath = path.resolve(params.dumpPath);
  const stats = {};
  let errors = 0;

  const dirs = await fs.readdir(dumpPath);
  const services = [];
  for(let dir of dirs) {
    let stats = await fs.lstat(path.join(dumpPath, dir));
    if(stats.isDirectory()) {
      services.push({
        name: dir,
        path: path.join(dumpPath, dir)
      })
    }
  }
  for(let service of services) {
    this.logger.info(`Restoring '${service.name}' from ${service.path}`);

    let files = await fs.readdir(service.path);
    this.logger.debug(`${files.length} entities of ${service.path} service found`);
    stats[service.name] = files.length;

    const allEntities = await ctx.call(service.name + '.find', {fields: ['id']});

    Promise.all(allEntities.map((item) => ctx.call(service.name + '.remove', {id: item.id})));

    for(let file of files) {
      let data = await fs.readFile(path.join(service.path, file), 'utf8');
      try {
        let entity = JSON.parse(data);
        await await ctx.call(service.name + '.create', entity);
      } catch(err) {
        this.logger.warn(`unable to restore ${path.join(service.path, file)}`);
        this.logger.error(err);
        errors = errors + 1;
      }

    }

  }

  return {
    entities: stats,
    dumpPath,
    errors
  };
}
