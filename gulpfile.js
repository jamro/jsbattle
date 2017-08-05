const gulp = require('gulp');
require('gulp-stats')(gulp);
const plugins = require('gulp-load-plugins')();

var config = require('./build/config.js')

config.devMode = !!plugins.util.env.dev;

gulp.task('clean', require('./build/clean.js')(gulp, config, plugins));
gulp.task('copy', ['clean'], require('./build/copy.js')(gulp, config, plugins));

gulp.task('engine.sprites', ['copy'], require('./build/engine.sprites.js')(gulp, config, plugins));
gulp.task('engine.jshint', require('./build/engine.jshint.js')(gulp, config, plugins));
gulp.task('engine.test', require('./build/engine.test.js')(gulp, config, plugins));
gulp.task('engine.sources', ['copy', 'engine.jshint', 'engine.test'], require('./build/engine.sources.js')(gulp, config, plugins));

gulp.task('tanks.sources', ['copy'], require('./build/tanks.sources.js')(gulp, config, plugins));

gulp.task('webpage.jshint', require('./build/webpage.jshint.js')(gulp, config, plugins));
gulp.task('webpage.sources', ['copy', 'webpage.jshint'], require('./build/webpage.sources.js')(gulp, config, plugins));

gulp.task('all', [
  'webpage.sources',
  'engine.sources',
  'engine.sprites',
  'tanks.sources'
], require('./build/beep.js')(gulp, config, plugins));


gulp.task('watch', function() {
  gulp.watch('app/**/*', ['all']);
});

gulp.task('default', ['all']);
