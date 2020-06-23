module.exports = {
  initScore: 0,
  step: (iteration) => {
    return {
      id: 1,
      name: 'benchmark',
      battleScore: iteration % 10 ? 0 : 300,
      winner: iteration % 10 ? false : true
    }
  }

}
