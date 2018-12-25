module.exports = function (gulp, config, plugins) {
  return function (done) {
    plugins.sequence(
      'engine.test',
      'tanks.test',
      //'webpage.test',
      'beep',
      done
    )
  };
};
