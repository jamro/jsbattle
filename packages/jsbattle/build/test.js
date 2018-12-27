module.exports = function (gulp, config, plugins) {
  return function (done) {
    plugins.sequence(
      'webpage.test',
      'beep',
      done
    )
  };
};
