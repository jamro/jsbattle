module.exports = function (gulp, config, plugins) {
    if(config.devMode) {
      plugins.util.log(plugins.util.colors.yellow("engine.jshint disabled in dev mode"));
      return function () {
        return gulp.src('.').pipe(plugins.util.noop());
      }
    }
    return function () {
      return gulp.src(config.engine.sources)
        .pipe(plugins.jshint({
          esversion: 6,
          node: true,
          browser: true,
          globals: {
            'Worker': true
          }
        }))
        .pipe(plugins.jshint.reporter('default'))
    };
};
