const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = function (gulp, config, plugins, minify) {
    return function () {
      var webpackPlugins = [];
      if(!config.devMode && minify) {
        webpackPlugins.push(new UglifyJSPlugin({
          sourceMap: true,
          minimize: true,
          compress: false,
        }));
      }
      return gulp.src(config.engine.sources.concat(config.engine.lib))
        .pipe(plugins.webpack({
          entry: {
            app: config.engine.entry
          },
          devtool: (!config.devMode) ? "source-map" : null,
          output: {
            filename: minify ? 'jsbattle.min.js' : 'jsbattle.js',
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
