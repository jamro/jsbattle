const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = function (gulp, config, plugins) {
    return function () {
      return gulp.src(config.engine.sources.concat(config.engine.lib))
        .pipe(plugins.webpack({
          entry: {
            app: config.engine.entry
          },
          devtool: "source-map",
          output: {
            filename: 'jsbattle.min.js',
            library: 'JsBattle',
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
                test: /\.json$/,
                include: 'node_modules/pixi.ja/dist/pixi.js',
                loader: 'json',
              },
              {
                test: /\.js$/,
                exclude: /(nodes_modules)/,
                loader: "babel-loader",
                query: {
                    presets: ["es2015"]
                }
              }
            ],
            postLoaders: [
                {
                    include: "node_modules/pixi.js/dist/pixi.js",
                    loader: 'transform?brfs'
                }
            ]
          }
        }))
        .pipe(gulp.dest(config.dist + 'js/'));
    };
};
