module.exports = function (gulp, config, plugins) {
  return function (done) {
    plugins.sequence(
      'dist.buildno',
      'dist.clean',
      'webpage.copy',
      'engine.docs',
      'webpage.sources',
      'engine.sources',
      'engine.sources.min',
      'engine.sprites',
      'tanks.copy',
      'tanks.sources',
      'server.copy',
      'beep',
      done)
  };
};
