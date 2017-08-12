module.exports = function (gulp, config, plugins) {
  if(config.devMode) {
    plugins.util.log(plugins.util.colors.yellow("clean-tmp disabled in dev mode"));
    return function () {
      return gulp.src('.').pipe(plugins.util.noop());
    }
  }
  return function () {
    return gulp.src(config.tmp)
      .pipe(plugins.clean());
  };
};
