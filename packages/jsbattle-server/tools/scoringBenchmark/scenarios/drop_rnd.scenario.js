module.exports = {
  initScore: 10000,
  step: (iteration) => {
    let winning;
    if(iteration < 500) {
      winning = (Math.random() > 0.1);
    } else {
      winning = (Math.random() > 0.9);
    }

    return {
      id: 1,
      name: 'benchmark',
      battleScore: winning ? 300 : 0,
      winner: winning ? true : false
    }
  }

}
