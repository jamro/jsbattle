const gulp = require('gulp');

const clean = require('gulp-clean');
const jslint = require('gulp-jslint');
const jshint = require('gulp-jshint');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const webpack = require('gulp-webpack');
const sourcemaps = require('gulp-sourcemaps');
const mocha = require('gulp-mocha');


var paths = {
 entry: "./app/scripts/entry.js",
 scripts: ['app/scripts/**/*.js'],
 html: ['app/html/**/*'],
 docs: ['docs/**/*'],
 dist: 'dist/',
 tanks: ['app/tanks/*.tank.js', 'app/tanks/index.json'],
 test: ['test/**/*.test.js'],
 lib: [
   'node_modules/sat/SAT.js',
   'node_modules/seedrandom/seedrandom.js'
 ],
 externalLib: [
  'node_modules/pixi.js/dist/pixi.min.js',
  'node_modules/jquery/dist/jquery.min.js'
 ]
};

var sandboxPaths = {
  entry: "./app/tanks/lib/tank.js",
  scripts: ['app/tanks/lib/**/*.js'],
  lib: ['node_modules/seedrandom/seedrandom.js'],
  dist: 'dist/js/tanks/lib/'
};

gulp.task('clean', function(){
  return gulp.src(paths.dist).pipe(clean());
});

gulp.task('jshint', null, function() {
  return gulp.src(paths.scripts)
    .pipe(jshint({
      esversion: 6,
      node: true,
      globals: {
        'Worker': true
      }
    }))
    .pipe(jshint.reporter('default'))
})

gulp.task('test', function() {
  return gulp.src(paths.test, { read: false })
    .pipe(mocha({
      reporter: 'spec',
      globals: {
        should: require('should')
      }
    }));
});

gulp.task('sandbox', [], function() {
  return gulp.src(sandboxPaths.scripts.concat(sandboxPaths.lib))
    .pipe(jshint.reporter('default'))
    .pipe(webpack({
      entry: {
        app: sandboxPaths.entry
      },
      output: {
        filename: 'tank.js',
        library: 'tank',
        libraryTarget: 'var'
      },
      node: {
      	fs: 'empty'
      },
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /(nodes_modules)/,
            loader: "babel-loader",
            query: {
                presets: ["es2015"]
            }
          }
        ]
      }
    }))
    .pipe(uglify())
    .pipe(gulp.dest(sandboxPaths.dist));
})

gulp.task('scripts', ['clean', 'jshint'], function() {
  return gulp.src(paths.scripts.concat(paths.lib))
    .pipe(sourcemaps.init())
    .pipe(webpack({
      entry: {
        app: paths.entry
      },
      output: {
        filename: 'jsbattle.min.js',
        library: 'JsBattle',
        libraryTarget: 'var'
      },
      node: {
      	fs: 'empty'
      },
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
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist + 'js/'));
})

gulp.task('copy', ['clean'], function() {

  gulp.src(paths.html)
    .pipe(gulp.dest(paths.dist));

  gulp.src(paths.tanks)
    .pipe(gulp.dest(paths.dist + "js/tanks/"));

  gulp.src(paths.externalLib)
    .pipe(gulp.dest(paths.dist + "js/lib/"));

    gulp.src(paths.docs)
      .pipe(gulp.dest(paths.dist + "docs/"));
});

gulp.task('watch', function() {
  gulp.watch('app/**/*', ['default']);
});

gulp.task('default', ['test', 'jshint', 'clean', 'scripts', 'copy', 'sandbox']);
