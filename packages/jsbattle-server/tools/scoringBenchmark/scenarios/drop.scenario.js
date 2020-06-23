module.exports = {
  initScore: 10000,
  step: (iteration) => {
    let winning;
    if(iteration < 500) {
      winning = !!(iteration % 10);
    } else {
      winning = !(iteration % 10);
    }

    return {
      id: 1,
      name: 'benchmark',
      battleScore: winning ? 300 : 0,
      winner: winning ? true : false
    }
  }

}
