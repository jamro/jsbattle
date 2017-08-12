const gulp = require('gulp');
require('gulp-stats')(gulp);
const plugins = require('gulp-load-plugins')();

var config = require('./build/config.js')

config.devMode = !!plugins.util.env.dev;

gulp.task('clean', require('./build/clean.js')(gulp, config, plugins));
gulp.task('clean-tmp', require('./build/clean-tmp.js')(gulp, config, plugins));

gulp.task('engine.sprites', ['clean', 'webpage.copy'], require('./build/engine.sprites.js')(gulp, config, plugins));
gulp.task('engine.jshint', require('./build/engine.jshint.js')(gulp, config, plugins));
gulp.task('engine.test', require('./build/engine.test.js')(gulp, config, plugins));
gulp.task('engine.sources', ['clean', 'webpage.copy', 'engine.jshint', 'engine.test'], require('./build/engine.sources.js')(gulp, config, plugins));

gulp.task('tanks.sources', ['clean', 'tanks.copy', 'tanks.test'], require('./build/tanks.sources.js')(gulp, config, plugins));
gulp.task('tanks.copy', ['clean'], require('./build/tanks.copy.js')(gulp, config, plugins));
gulp.task('tanks.test', require('./build/tanks.test.js')(gulp, config, plugins));

gulp.task('webpage.jshint', require('./build/webpage.jshint.js')(gulp, config, plugins));
gulp.task('webpage.sources', ['clean', 'webpage.copy', 'webpage.jshint'], require('./build/webpage.sources.js')(gulp, config, plugins));
gulp.task('webpage.copy', ['clean'], require('./build/webpage.copy.js')(gulp, config, plugins));
gulp.task('webpage.test', ['clean', 'engine.sources', 'tanks.sources', 'tanks.copy', 'webpage.sources', 'webpage.copy'], require('./build/webpage.test.js')(gulp, config, plugins));


gulp.task('test', [
  'webpage.test',
  'engine.test',
  'tanks.test',
], require('./build/beep.js')(gulp, config, plugins));


gulp.task('all', [
  'webpage.copy',
  'webpage.sources',
  'engine.sources',
  'engine.sprites',
  'tanks.copy',
  'tanks.sources',
  'webpage.test',
  'engine.test',
  'tanks.test'
], require('./build/beep.js')(gulp, config, plugins));

gulp.task('engine-all', [
  'engine.sources',
  'engine.sprites',
], require('./build/beep.js')(gulp, config, plugins));

gulp.task('webpage-all', [
  'webpage.copy',
  'webpage.sources',
], require('./build/beep.js')(gulp, config, plugins));

gulp.task('tanks-all', [
  'tanks.sources',
  'tanks.copy',
], require('./build/beep.js')(gulp, config, plugins));


gulp.task('watch', function() {
  if(!config.devMode) {
    plugins.util.log(plugins.util.colors.red("ERROR: use gulp watch with --dev option only"));
    return;
  }
  gulp.watch('app/engine/**/*', ['engine-all'])
  gulp.watch('app/webpage/**/*', ['webpage-all'])
  gulp.watch('app/tanks/**/*', ['tanks-all'])
});

gulp.task('default', ['all']);
