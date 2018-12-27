const path = require('path');

module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: path.resolve(__dirname, 'src/engine/entry.js'),
  node: {
    fs: 'empty'
  },
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'jsbattle.min.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env']
        }
      }
    ]
  },
};
