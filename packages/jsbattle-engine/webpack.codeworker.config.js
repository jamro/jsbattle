const path = require('path');

module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: path.resolve(__dirname, 'src/tanks/lib/codeWorker.js'),
  node: {
    fs: 'empty'
  },
  output: {
    path: path.resolve(__dirname, 'dist/tanks/lib/'),
    filename: 'codeWorker.js'
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
