module.exports = function (gulp, config, plugins) {
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
