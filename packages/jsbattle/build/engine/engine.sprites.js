module.exports = function (gulp, config, plugins) {
    return function (done) {
      gulp.src(__dirname + "/../../" + config.engine.spritesheets)
        .pipe(gulp.dest(config.dist + "public/img/spritesheets/"))
        .on('end', done);
    };
};
