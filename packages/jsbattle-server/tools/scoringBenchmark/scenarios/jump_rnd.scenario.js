const seedrandom = require('seedrandom');
const rng = seedrandom(__filename);

module.exports = {
  initScore: 0,
  step: (iteration) => {
    let winning;
    if(iteration < 500) {
      winning = (rng() > 0.9);
    } else {
      winning = (rng() > 0.1);
    }

    return {
      id: 1,
      name: 'benchmark',
      battleScore: winning ? 300 : 0,
      winner: winning ? true : false
    }
  }

}
