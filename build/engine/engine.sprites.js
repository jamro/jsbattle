module.exports = function (gulp, config, plugins) {
    return function (done) {
      gulp.src(__dirname + "/../../" + config.engine.spritesheets)
        .pipe(gulp.dest(config.tmp + "dist/public/img/spritesheets/"))
        .on('end', done);
    };
};
