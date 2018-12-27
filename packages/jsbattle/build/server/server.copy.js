const through = require('through2');

module.exports = function (gulp, config, plugins) {
    return function (done) {
      var completeCount = 0;
      function onComplete() {
        completeCount++;
        if(completeCount == 1) {
          done();
        }
      }
      gulp.src(config.server.sources)
        .pipe(gulp.dest(config.dist))
        .on('end', onComplete);

    };
};
