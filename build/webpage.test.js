module.exports = function (gulp, config, plugins) {
  if(config.devMode) {
    plugins.util.log(plugins.util.colors.yellow("webpage.test disabled in dev mode"));
    return function () {
      return gulp.src('.').pipe(plugins.util.noop());
    }
  }
  return function () {
    plugins.connect.server({
      name: 'test',
      root: config.dist,
      port: 8070
    });
    return gulp.src(config.webpage.test)
      .pipe(plugins.casperjsLocal.default({binPath: './node_modules/.bin/casperjs'}))
      .on('error', function(){
        process.emit('exit');
      })
      .on('end', function () {
        plugins.connect.serverClose();
      });

  };
};
