module.exports = function (gulp, config, plugins) {
  return function (done) {
    plugins.sequence(
      'dist.buildno',
      'engine.lint',
      'webpage.lint',
      'server.lint',
      'engine.test',
      'tanks.test',
      'clean',
      'webpage.copy',
      'engine.docs',
      'webpage.sources',
      'engine.sources',
      'engine.sources.min',
      'engine.sprites',
      'tanks.copy',
      'tanks.sources',
      'server.copy',
      'webpage.test',
      'dist.clean',
      'dist.copy',
      'beep',
      done)
  };
};
