module.exports = {
  initScore: 0,
  step: (iteration) => {
    return {
      id: 1,
      name: 'benchmark',
      battleScore: iteration % 100 ? 0 : 300,
      winner: iteration % 100 ? false : true
    }
  }

}
