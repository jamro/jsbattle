module.exports = function (gulp, config, plugins) {
  if(config.devMode) {
    plugins.util.log(plugins.util.colors.yellow("clean disabled in dev mode"));
    return function () {
      return gulp.src('.').pipe(plugins.util.noop());
    }
  }
  return function () {
    return gulp.src(config.dist)
      .pipe(plugins.clean());
  };
};
