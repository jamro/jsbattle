module.exports = function (gulp, config, plugins) {
  return function () {
    return gulp.src([config.tmp, config.dist])
      .pipe(plugins.clean());
  };
};
