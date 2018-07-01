module.exports = function (gulp, config, plugins) {
    return function (done) {
      gulp.src(config.tanks.resources, { base : config.tanks.resourcesBase })
        .pipe(gulp.dest(config.tmp + "dist/public/tanks/"))
        .on('end', done);
    };
};
