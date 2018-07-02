module.exports = function (gulp, config, plugins) {
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
