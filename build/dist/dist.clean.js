module.exports = function (gulp, config, plugins) {
  return function () {
    return gulp.src(config.dist)
      .pipe(plugins.clean());
  };
};
