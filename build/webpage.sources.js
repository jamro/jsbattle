const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = function (gulp, config, plugins) {
    return function () {
      return gulp.src(config.webpage.sources.concat(config.webpage.lib))
        .pipe(plugins.jshint.reporter('default'))
        .pipe(plugins.webpack({
          entry: {
            app: config.webpage.entry
          },
          devtool: "source-map",
          output: {
            filename: 'webpage.min.js',
            library: 'webpage',
            libraryTarget: 'var'
          },
          node: {
          	fs: 'empty'
          },
          plugins: [
            new UglifyJSPlugin({
              sourceMap: true
            })
          ],
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
        .pipe(gulp.dest(config.dist + "js/"));
    };
};
