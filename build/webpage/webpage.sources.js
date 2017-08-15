const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = function (gulp, config, plugins) {
    return function () {
      var webpackPlugins = [];
      if(!config.devMode) {
        webpackPlugins.push(new UglifyJSPlugin({
          sourceMap: true
        }));
      }
      return gulp.src(config.webpage.sources.concat(config.webpage.lib))
        .pipe(plugins.webpack({
          entry: {
            app: config.webpage.entry
          },
          devtool: (!config.devMode) ? "source-map" : null,
          output: {
            filename: 'webpage.min.js',
            library: 'webpage',
            libraryTarget: 'var'
          },
          node: {
          	fs: 'empty'
          },
          plugins: webpackPlugins,
          module: {
            loaders: [
              {
                test: /\.jsx?$/,
                exclude: /(nodes_modules)/,
                loader: "babel-loader",
                query: {
                    presets: ["es2015", "react"]
                }
              },
            ]
          }
        }))
        .pipe(plugins.injectVersion())
        .pipe(gulp.dest(config.tmp + "dist/js/"))
    };
};
