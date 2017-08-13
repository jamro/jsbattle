module.exports = function (gulp, config, plugins) {
    return function (done) {
      var completeCount = 0;
      function onComplete() {
        completeCount++;
        if(completeCount == 3) {
          done();
        }
      }
      gulp.src(config.webpage.static)
        .pipe(gulp.dest(config.tmp + 'dist/'))
        .on('end', onComplete);

      gulp.src(config.webpage.externalLib, { base : 'node_modules' })
        .pipe(gulp.dest(config.tmp + "dist/vendor/"))
        .on('end', onComplete);

      gulp.src(config.docs.sources)
        .pipe(gulp.dest(config.tmp + "dist/docs/"))
        .on('end', onComplete);
    };
};
