require('babel-register')();

module.exports = function (gulp, config, plugins) {
    return function () {
      return gulp.src(config.engine.test, { read: false })
        .pipe(plugins.mocha({
          reporter: 'spec',
          require: "babel-core/register",
          globals: {
            should: require('should')
          }
        }));
    };
};
