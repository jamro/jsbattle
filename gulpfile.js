const gulp = require('gulp');
require('gulp-stats')(gulp);
const plugins = require('gulp-load-plugins')();

var config = require('./build/config.js')

config.devMode = !!plugins.util.env.dev;

gulp.task('clean', require('./build/clean.js')(gulp, config, plugins));
gulp.task('clean-all', require('./build/clean-all.js')(gulp, config, plugins));
gulp.task('beep', require('./build/beep.js')(gulp, config, plugins));

gulp.task('dist.clean', require('./build/dist/dist.clean.js')(gulp, config, plugins));
gulp.task('dist.copy', require('./build/dist/dist.copy.js')(gulp, config, plugins));

gulp.task('engine.sprites', require('./build/engine/engine.sprites.js')(gulp, config, plugins));
gulp.task('engine.jshint', require('./build/engine/engine.jshint.js')(gulp, config, plugins));
gulp.task('engine.test', require('./build/engine/engine.test.js')(gulp, config, plugins));
gulp.task('engine.sources', require('./build/engine/engine.sources.js')(gulp, config, plugins, false));
gulp.task('engine.sources.min', require('./build/engine/engine.sources.js')(gulp, config, plugins, true));
gulp.task('engine.docs', require('./build/engine/engine.docs.js')(gulp, config, plugins));

gulp.task('tanks.jshint', require('./build/tanks/tanks.jshint.js')(gulp, config, plugins));
gulp.task('tanks.sources', require('./build/tanks/tanks.sources.js')(gulp, config, plugins));
gulp.task('tanks.copy', require('./build/tanks/tanks.copy.js')(gulp, config, plugins));
gulp.task('tanks.test', require('./build/tanks/tanks.test.js')(gulp, config, plugins));

gulp.task('webpage.jshint', require('./build/webpage/webpage.jshint.js')(gulp, config, plugins));
gulp.task('webpage.sources', require('./build/webpage/webpage.sources.js')(gulp, config, plugins));
gulp.task('webpage.copy', require('./build/webpage/webpage.copy.js')(gulp, config, plugins));
gulp.task('webpage.test', require('./build/webpage/webpage.test.js')(gulp, config, plugins));

gulp.task('test', require('./build/test.js')(gulp, config, plugins));
gulp.task('watch', require('./build/watch.js')(gulp, config, plugins));
gulp.task('all', require('./build/all.js')(gulp, config, plugins));


gulp.task('default', ['all']);
