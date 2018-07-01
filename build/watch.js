module.exports = function (gulp, config, plugins) {

  gulp.task('connect-reload', function() {
    return gulp.src(config.tmp + 'dist/public/')
      .pipe(plugins.connect.reload());
  });

  gulp.task('rebuild-engine', function(done) {
    plugins.sequence(
      'engine.sources.min',
      'engine.sprites',
      'engine.docs',
      'connect-reload',
      'beep',
      done
    );
  });

  gulp.task('rebuild-webpage', function(done) {
    plugins.sequence(
      'webpage.copy',
      'webpage.sources',
      'connect-reload',
      'beep',
      done
    );
  });

  gulp.task('rebuild-tanks', function(done) {
    plugins.sequence(
      'tanks.sources',
      'tanks.copy',
      'connect-reload',
      'beep',
      done
    );
  });

  return function() {
    plugins.connect.server({
      root: config.tmp + 'dist/public/',
      livereload: true,
      name: 'Development Server'
    });
    gulp.watch('app/engine/**/*', ['rebuild-engine'])
    gulp.watch('app/webpage/**/*', ['rebuild-webpage'])
    gulp.watch('docs/**/*', ['rebuild-webpage'])
    gulp.watch('app/tanks/**/*', ['rebuild-tanks'])
  }
};
