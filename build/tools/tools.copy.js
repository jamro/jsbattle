const through = require('through2');
const plantuml = require('node-plantuml');

module.exports = function (gulp, config, plugins) {
    return function (done) {
      var completeCount = 0;

      gulp.src(config.tools.sources)
        .pipe(gulp.dest(config.tmp + 'dist/tools/'))
        .on('end', done);

    };
};
