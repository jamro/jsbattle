module.exports = function (gulp, config, plugins) {
  return function (done) {
    plugins.sequence(
      'engine.lint',
      'tanks.lint',
      'webpage.lint',
      'beep',
      done
    )
  };
};
