const through = require('through2');
const plantuml = require('node-plantuml');

module.exports = function (gulp, config, plugins) {
    return function (done) {
      var completeCount = 0;
      function onComplete() {
        completeCount++;
        if(completeCount == 5) {
          done();
        }
      }
      gulp.src('node_modules/jsbattle-engine/dist/js/**/*.*')
        .pipe(gulp.dest(config.dist + 'public/js/'))
        .on('end', onComplete);

      gulp.src('node_modules/jsbattle-engine/dist/img/**/*.*')
        .pipe(gulp.dest(config.dist + 'public/img/'))
        .on('end', onComplete);

      gulp.src('node_modules/jsbattle-engine/dist/tanks/**/*.*')
        .pipe(gulp.dest(config.dist + 'public/tanks/'))
        .on('end', onComplete);

      gulp.src('node_modules/jsbattle-engine/dist/schema/**/*.*')
        .pipe(gulp.dest(config.dist + 'public/schema/'))
        .on('end', onComplete);

      gulp.src('node_modules/jsbattle-engine/dist/schema/**/*.*')
        .pipe(gulp.dest(config.dist + 'schema/'))
        .on('end', onComplete);

    }
};
