module.exports = {
  initScore: 0,
  step: (iteration) => {
    return {
      id: 1,
      name: 'benchmark',
      battleScore: iteration % 100 ? 300 : 0,
      winner: iteration % 100 ? true : false
    }
  }

}
