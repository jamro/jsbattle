module.exports = function (gulp, config, plugins) {
  return function (done) {
    plugins.sequence(
      'dist.buildno',
      'dist.clean',
      'webpage.copy',
      'engine.copy',
      'webpage.sources',
      'server.copy',
      'beep',
      done)
  };
};
