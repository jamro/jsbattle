module.exports = function (gulp, config, plugins) {
  return function (done) {
    plugins.sequence(
      'engine.jshint',
      'tanks.jshint',
      'webpage.jshint',
      'engine.test',
      'tanks.test',
      'webpage.test',
      'beep',
      done
    )
  };
};
