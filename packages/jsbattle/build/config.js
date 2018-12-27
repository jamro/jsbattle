module.exports = {
  engine: {
    entry: "./src/engine/entry.js",
    sources: ['src/engine/**/*.js'],
    test: ['test/engine/**/*.test.js'],
    spritesheets: ['resources/spritesheets/**/*.*'],
    lib: [
      'node_modules/sat/SAT.js',
      'node_modules/seedrandom/seedrandom.js'
    ],
  },
  schema: {
    sources: 'src/schema/**/*'
  },
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
  docs: {
    sources: ['docs/**/*'],
    apiDist: 'docs/dev_guide',
    plantuml: {
      sources: 'docs/puml/**/*.puml',
      target: 'docs/img/puml/'
    }
  },
  tanks: {
    resourcesBase: 'src/tanks/',
    resources: [
      'src/tanks/*.tank.js',
      'src/tanks/index.json',
      'src/tanks/lib/codeWorker.js'
    ],
    test: ['test/tanks/**/*.test.js'],
    entry: "./src/tanks/lib/tank.js",
    sources: ['src/tanks/lib/**/*.js'],
    lib: ['node_modules/seedrandom/seedrandom.js'],
  },
  dist: 'dist/',
  tmp: 'tmp/'
};
