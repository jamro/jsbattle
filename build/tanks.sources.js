module.exports = function (gulp, config, plugins) {
    return function () {
      return gulp.src(config.tanks.sources.concat(config.tanks.lib))
        .pipe(plugins.jshint.reporter('default'))
        .pipe(plugins.webpack({
          entry: {
            app: config.tanks.entry
          },
          output: {
            filename: 'tank.js',
            library: 'tank',
            libraryTarget: 'var'
          },
          node: {
          	fs: 'empty'
          },
          module: {
            loaders: [
              {
                test: /\.js$/,
                exclude: /(nodes_modules)/,
                loader: "babel-loader",
                query: {
                    presets: ["es2015"]
                }
              }
            ]
          }
        }))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(config.dist + "tanks/lib/"));
    };
};
