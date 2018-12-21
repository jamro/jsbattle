const through = require('through2');

module.exports = function (gulp, config, plugins) {
    return function (done) {
      var completeCount = 0;
      function onComplete() {
        completeCount++;
        if(completeCount == 2) {
          done();
        }
      }
      gulp.src(config.server.sources)
        .pipe(gulp.dest(config.dist))
        .on('end', onComplete);

      gulp.src(config.schema.sources)
        .pipe(gulp.dest(config.dist + 'schema/'))
        .on('end', onComplete);
    };
};
