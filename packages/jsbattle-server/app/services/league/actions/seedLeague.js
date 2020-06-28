const fs = require('fs');
const path = require('path');

module.exports = async function(ctx) {
  const seedPath = path.resolve(__dirname, '..', 'seed');
  const seedFiles = fs.readdirSync(seedPath)
    .map((filename, index) => ({
      ownerId: 'int-user-0000-1',
      ownerName: 'jsbattle',
      scriptId: 'int-script-0000-' + (index+1),
      scriptName: filename.replace(/\.tank$/, ''),
      code: fs.readFileSync(path.resolve(seedPath, filename), 'utf8')
    }))
    .map((entry) => new Promise(async (resolve) => {
      let existingEntry = await ctx.call('league.find', {
        query: {
          ownerName: 'jsbattle',
          scriptName: entry.scriptName,
        }
      });
      if(existingEntry.length == 0) {
        await ctx.call('league.create', entry);
      }
      resolve();
    }));

  await Promise.all(seedFiles);
}
