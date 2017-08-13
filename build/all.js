module.exports = function (gulp, config, plugins) {
  return function (done) {
    plugins.sequence(
      'engine.jshint',
      'webpage.jshint',
      'engine.test',
      'tanks.test',
      'clean',
      'webpage.copy',
      'engine.docs',
      'webpage.sources',
      'engine.sources',
      'engine.sprites',
      'tanks.copy',
      'tanks.sources',
      'webpage.test',
      'dist.clean',
      'dist.copy',
      'beep',
      done)
  };
};
