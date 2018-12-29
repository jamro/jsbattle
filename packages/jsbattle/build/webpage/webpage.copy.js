const through = require('through2');
const plantuml = require('node-plantuml');

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
        .pipe(gulp.dest(config.dist + 'public/'))
        .on('end', onComplete);

      gulp.src(config.webpage.externalLib, { base : 'node_modules' })
        .pipe(gulp.dest(config.dist + "public/vendor/"))
        .on('end', onComplete);

      gulp.src('node_modules/jsbattle-docs/dist/**/*.*')
        .pipe(gulp.dest(config.dist + "public/docs/"))
        .on('end', onComplete);

    };
};
