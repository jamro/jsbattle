const path = require('path');
const webpack = require('webpack');

let config = {
  mode: "production",
  entry: path.resolve(__dirname, 'src/index.js'),
  target: 'node',
  externals: ['express'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'jsbattle-server.js',
    libraryTarget: 'umd'
  },
  plugins: []
};

module.exports = (env, argv) => {
  config.plugins.push(
    new webpack.DefinePlugin({
      'DEBUG_MODE': (argv.mode === 'development'),
      'VERSION': JSON.stringify(require("./package.json").version)
    })
  );
  if (argv.mode === 'development') {
    console.log('DEVELOPMENT MODE');
    config.devtool = 'source-map';
  } else if (argv.mode === 'production') {
    console.log('PRODUCTION MODE');
  }

  return config;
}
