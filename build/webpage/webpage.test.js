module.exports = function (gulp, config, plugins) {
  return function () {
    plugins.connect.server({
      name: 'Test Server',
      root: config.tmp + 'dist/',
      port: 8070
    });

    const options = {
      binPath: './node_modules/.bin/casperjs'
    }

    return gulp.src(config.webpage.test)
      .pipe(plugins.casperjs(options))
      .on('error', function(){
        process.emit('exit');
      })
      .on('end', function () {
        plugins.connect.serverClose();
      });

  };
};
