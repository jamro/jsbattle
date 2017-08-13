module.exports = function (gulp, config, plugins) {
    return function (done) {
      gulp.src(config.tmp + "dist/**/*")
        .pipe(gulp.dest(config.dist))
        .on('end', done);
    };
};
