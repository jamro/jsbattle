const path = require('path');

module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: path.resolve(__dirname, 'src/tanks/lib/codeWorker.js'),
  output: {
    path: path.resolve(__dirname, 'dist/tanks/lib/'),
    filename: 'codeWorker.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
};
