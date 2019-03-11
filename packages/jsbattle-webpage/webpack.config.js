const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin')

let config = {
  mode: "production",
  entry: path.resolve(__dirname, 'src/entry.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/webpage.min.js',
    library: 'webpage',
    libraryTarget: 'var'
  },
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          query: {
            presets: ['@babel/preset-react']
          }
        }
      }
    ]
  },
  plugins: []
};

module.exports = (env, argv) => {
  let now = new Date();
  let buildno = "";
  buildno += now.getFullYear();
  buildno += ((now.getMonth()+1)  < 10) ? "0" : "";
  buildno += (now.getMonth()+1);
  buildno += ((now.getDate())  < 10) ? "0" : "";
  buildno += (now.getDate());
  buildno += ((now.getHours())  < 10) ? "0" : "";
  buildno += (now.getHours());
  buildno += ((now.getMinutes())  < 10) ? "0" : "";
  buildno += (now.getMinutes());
  buildno += ((now.getSeconds())  < 10) ? "0" : "";
  buildno += (now.getSeconds());

  let version = JSON.stringify(require("./package.json").version).replace(/"/g, '');
  version += "-" + buildno;
  version = '"' + version + '"';

  config.plugins.push(
    new webpack.DefinePlugin({
      'DEBUG_MODE': (argv.mode === 'development'),
      'VERSION':  version
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
