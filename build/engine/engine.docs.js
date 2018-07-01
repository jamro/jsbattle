module.exports = function (gulp, config, plugins) {
    return function () {
      return gulp.src(config.engine.sources)
        .pipe(plugins.concat('api.md'))
        .pipe(plugins.jsdocToMarkdown({
          template: "# JsBattle API\n{{>main}}"
        }))
        .pipe(gulp.dest(config.tmp + 'dist/public/docs/dev_guide'))
        .pipe(gulp.dest(config.docs.apiDist))
    };
};
