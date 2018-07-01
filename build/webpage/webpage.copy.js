const through = require('through2');
const plantuml = require('node-plantuml');

module.exports = function (gulp, config, plugins) {
    return function (done) {
      var completeCount = 0;
      function onComplete() {
        completeCount++;
        if(completeCount == 4) {
          done();
        }
      }
      gulp.src(config.webpage.static)
        .pipe(gulp.dest(config.tmp + 'dist/public/'))
        .on('end', onComplete);

      gulp.src(config.webpage.externalLib, { base : 'node_modules' })
        .pipe(gulp.dest(config.tmp + "dist/public/vendor/"))
        .on('end', onComplete);

      gulp.src(config.docs.sources)
        .pipe(gulp.dest(config.tmp + "dist/public/docs/"))
        .on('end', onComplete);

      gulp.src(config.docs.plantuml.sources)
        .pipe(through.obj(function(originalFile, enc, cb) {
          var file = originalFile.clone({contents: false});
          file.path = file.path.replace(/\.puml$/, '.png');
          var gen = plantuml.generate(originalFile.path, {format: 'png'});

          var chunks = []
          gen.out.on('data', function (chunk) {
            chunks.push(chunk);
          });
          gen.out.on('end', function () {
            file.contents = Buffer.concat(chunks);
            cb(null, file);
          });

        }))
        .pipe(gulp.dest(config.tmp + 'dist/public/' + config.docs.plantuml.target))
        .pipe(gulp.dest(config.docs.plantuml.target))
        .on('end', onComplete);
    };
};
