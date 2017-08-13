module.exports = function (gulp, config, plugins) {
  return function () {
    plugins.connect.server({
      name: 'Test Server',
      root: config.tmp + 'dist/',
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
