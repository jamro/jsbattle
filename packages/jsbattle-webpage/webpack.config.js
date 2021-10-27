const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin')

let config = {
  mode: "production",
  entry: {
    webpage: path.resolve(__dirname, 'src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js',
    library: 'webpage',
    libraryTarget: 'var'
  },
  externals: {
    'pixi.js': 'PIXI'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-react']
          }
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader"
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      }
    ]
  },
  plugins: [],
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
    hot: true,
    proxy: {
      '/api': 'http://[::1]:9000',
      '/auth': 'http://[::1]:9000'
    }
  }
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
