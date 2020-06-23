module.exports = {
  initScore: 0,
  step: (iteration) => {
    return {
      id: 1,
      name: 'benchmark',
      battleScore: iteration % 2  ? 0 : 300,
      winner: iteration % 2 ? false : true
    }
  }

}
