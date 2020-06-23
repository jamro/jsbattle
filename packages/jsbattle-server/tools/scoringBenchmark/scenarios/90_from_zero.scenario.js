module.exports = {
  initScore: 0,
  step: (iteration) => {
    return {
      id: 1,
      name: 'benchmark',
      battleScore: iteration % 10 ? 300 : 0,
      winner: iteration % 10 ? true : false
    }
  }

}
