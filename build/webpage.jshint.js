module.exports = function (gulp, config, plugins) {
    if(config.devMode) {
      plugins.util.log(plugins.util.colors.yellow("webpage.jshint disabled in dev mode"));
      return function () {
        return gulp.src('.').pipe(plugins.util.noop());
      }
    }
    return function () {
      return gulp.src(config.webpage.sources)
        .pipe(plugins.react())
        .on('error', function(err) {
          console.error('JSX ERROR in ' + err.fileName);
          console.error(err.message);
          this.end();
        })
        .pipe(plugins.jshint({
          esversion: 6,
          node: true,
          browser: true,
          globals: {

          }
        }))
        .pipe(plugins.jshint.reporter('default'))
    };
};
