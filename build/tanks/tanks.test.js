module.exports = function (gulp, config, plugins) {
    return function () {
      return gulp.src(config.tanks.test, { read: false })
        .pipe(plugins.mocha({
          reporter: 'spec',
          compilers: require('babel-register'),
          globals: {
            should: require('should')
          }
        }));
    };
};
