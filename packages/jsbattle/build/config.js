module.exports = {
  server: {
    sources: ['src/server/**/*'],
    test: ['test/server/**/*.test.js'],
  },
  webpage: {
    sources: ['src/webpage/sources/**/*'],
    static: ['src/webpage/static/**/*'],
    entry: './src/webpage/sources/entry.js',
    test: ['test/webpage/**/*.test.js'],
    lib: [
      'node_modules/sillyname/index.js'
    ],
    externalLib: [
     'node_modules/pixi.js/dist/pixi.min.js',
     'node_modules/jquery/dist/jquery.min.js',
     'node_modules/bootstrap/dist/**/*',
     'node_modules/react/umd/**/*',
     'node_modules/react-dom/umd/**/*',
     'node_modules/codemirror/lib/**/*',
     'node_modules/codemirror/mode/javascript/**/*',
     'node_modules/codemirror/addon/hint/**/*',
     'node_modules/codemirror/theme/ambiance.css',
     'node_modules/core-js/client/core.js',
     'node_modules/popper.js/dist/umd/**/*',
     'node_modules/clipboard/dist/clipboard.min.js',
     'node_modules/ajv/dist/ajv.min.js',
     'node_modules/@fortawesome/fontawesome-free/**/*'
    ]
  },
  dist: 'dist/',
  tmp: 'tmp/'
};
