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
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname + '/static/**/*'),
        context: path.resolve(__dirname + '/static'),
        to: path.resolve(__dirname + '/dist')
      },
      {
        from: path.resolve(__dirname + '/node_modules/pixi.js/dist/pixi.min.js'),
        to: path.resolve(__dirname + '/dist/vendor')
      },
      {
        from: path.resolve(__dirname + '/node_modules/jquery/dist/jquery.min.js'),
        to: path.resolve(__dirname + '/dist/vendor')
      },
      {
        from: path.resolve(__dirname + '/node_modules/bootstrap/dist/**/*'),
        context: path.resolve(__dirname + '/node_modules/bootstrap/dist'),
        to: path.resolve(__dirname + '/dist/vendor/bootstrap')
      },
      {
        from: path.resolve(__dirname + '/node_modules/react/umd/**/*'),
        context: path.resolve(__dirname + '/node_modules/react/umd'),
        to: path.resolve(__dirname + '/dist/vendor/react')
      },
      {
        from: path.resolve(__dirname + '/node_modules/react-dom/umd/**/*'),
        context: path.resolve(__dirname + '/node_modules/react-dom/umd'),
        to: path.resolve(__dirname + '/dist/vendor/react-dom')
      },
      {
        from: path.resolve(__dirname + '/node_modules/codemirror/lib/**/*'),
        context: path.resolve(__dirname + '/node_modules/codemirror/lib'),
        to: path.resolve(__dirname + '/dist/vendor/codemirror/lib')
      },
      {
        from: path.resolve(__dirname + '/node_modules/codemirror/mode/javascript/**/*'),
        context: path.resolve(__dirname + '/node_modules/codemirror/mode/javascript'),
        to: path.resolve(__dirname + '/dist/vendor/codemirror/mode')
      },
      {
        from: path.resolve(__dirname + '/node_modules/codemirror/addon/hint/**/*'),
        context: path.resolve(__dirname + '/node_modules/codemirror/addon/hint'),
        to: path.resolve(__dirname + '/dist/vendor/codemirror/addon/hint')
      },
      {
        from: path.resolve(__dirname + '/node_modules/codemirror/theme/ambiance.css'),
        to: path.resolve(__dirname + '/dist/vendor/codemirror/theme')
      },
      {
        from: path.resolve(__dirname + '/node_modules/core-js/client/core.js'),
        to: path.resolve(__dirname + '/dist/vendor')
      },
      {
        from: path.resolve(__dirname + '/node_modules/popper.js/dist/umd/**/*'),
        context: path.resolve(__dirname + '/node_modules/popper.js/dist/umd'),
        to: path.resolve(__dirname + '/dist/vendor/popperjs')
      },
      {
        from: path.resolve(__dirname + '/node_modules/clipboard/dist/clipboard.min.js'),
        to: path.resolve(__dirname + '/dist/vendor')
      },
      {
        from: path.resolve(__dirname + '/node_modules/ajv/dist/ajv.min.js'),
        to: path.resolve(__dirname + '/dist/vendor')
      },
      {
        from: path.resolve(__dirname + '/node_modules/@fortawesome/fontawesome-free/**/*'),
        context: path.resolve(__dirname + '/node_modules/@fortawesome/fontawesome-free'),
        to: path.resolve(__dirname + '/dist/vendor/fontawesome')
      },
      {
        from: path.resolve(__dirname + '/node_modules/jsbattle-engine/dist/**/*'),
        context: path.resolve(__dirname + '/node_modules/jsbattle-engine/dist'),
        to: path.resolve(__dirname + '/dist')
      },
      {
        from: path.resolve(__dirname + '/node_modules/jsbattle-docs/dist/**/*'),
        context: path.resolve(__dirname + '/node_modules/jsbattle-docs/dist'),
        to: path.resolve(__dirname + '/dist/docs')
      },

    ])
  ]
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
