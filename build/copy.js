module.exports = function (gulp, config, plugins) {
    return function () {
      gulp.src(config.webpage.static)
        .pipe(gulp.dest(config.dist));

      gulp.src(config.tanks.resources)
        .pipe(gulp.dest(config.dist + "js/tanks/"));

      gulp.src(config.webpage.externalLib, { base : 'node_modules' })
        .pipe(gulp.dest(config.dist + "vendor/"));

      gulp.src(config.docs.sources)
        .pipe(gulp.dest(config.dist + "docs/"));
    };
};
