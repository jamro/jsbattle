const gulp = require('gulp');
require('gulp-stats')(gulp);
const plugins = require('gulp-load-plugins')();

var config = require('./build/config.js')

config.devMode = !!plugins.util.env.dev;

gulp.task('clean-all', require('./build/clean-all.js')(gulp, config, plugins));
gulp.task('beep', require('./build/beep.js')(gulp, config, plugins));

gulp.task('dist.clean', require('./build/dist.clean.js')(gulp, config, plugins));
gulp.task('dist.buildno', require('./build/dist.buildno.js')(gulp, config, plugins));

gulp.task('engine.copy', require('./build/engine/engine.copy.js')(gulp, config, plugins));

gulp.task('webpage.lint', require('./build/webpage/webpage.lint.js')(gulp, config, plugins));
gulp.task('webpage.sources', require('./build/webpage/webpage.sources.js')(gulp, config, plugins));
gulp.task('webpage.copy', require('./build/webpage/webpage.copy.js')(gulp, config, plugins));
gulp.task('webpage.test', require('./build/webpage/webpage.test.js')(gulp, config, plugins));

gulp.task('server.copy', require('./build/server/server.copy.js')(gulp, config, plugins));
gulp.task('server.lint', require('./build/server/server.lint.js')(gulp, config, plugins));
gulp.task('server.test', require('./build/server/server.test.js')(gulp, config, plugins));

gulp.task('lint', require('./build/lint.js')(gulp, config, plugins));
gulp.task('test', require('./build/test.js')(gulp, config, plugins));
gulp.task('watch', require('./build/watch.js')(gulp, config, plugins));
gulp.task('build', require('./build/build.js')(gulp, config, plugins));


gulp.task('default', ['build']);
