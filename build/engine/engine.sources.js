const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = function (gulp, config, plugins) {
    return function () {
      var webpackPlugins = [];
      if(!config.devMode) {
        webpackPlugins.push(new UglifyJSPlugin({
          sourceMap: true
        }));
      }
      return gulp.src(config.engine.sources.concat(config.engine.lib))
        .pipe(plugins.webpack({
          entry: {
            app: config.engine.entry
          },
          devtool: (!config.devMode) ? "source-map" : null,
          output: {
            filename: 'jsbattle.min.js',
            library: 'JsBattle',
            libraryTarget: 'var'
          },
          node: {
            fs: 'empty'
          },
          plugins: webpackPlugins,
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
        .pipe(gulp.dest(config.tmp + 'dist/js/'));
    };
};
