module.exports = function (gulp, config, plugins) {
    return function () {
      return gulp.src(config.webpage.sources)
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
