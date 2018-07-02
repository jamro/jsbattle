module.exports = function (gulp, config, plugins) {
    return function () {
      return gulp.src(config.server.sources)
        .pipe(plugins.eslint())
        .pipe(plugins.eslint.format())
        .pipe(plugins.eslint.failAfterError());
    };
};
