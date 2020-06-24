const seedrandom = require('seedrandom');
const rng = seedrandom(__filename);

module.exports = {
  initScore: 0,
  step: (iteration) => {
    let rnd = rng();
    return {
      id: 1,
      name: 'benchmark',
      battleScore: rnd > 0.5 ? 0 : 300,
      winner: rnd > 0.5 ? false : true
    }
  }

}
