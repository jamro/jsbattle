const through = require('through2');
const PixiPacker = require('pixi-packer');

module.exports = function (gulp, config, plugins) {
    return function () {
      return gulp.src(config.engine.resources)
        .pipe(through.obj(function (dir, enc, cb) {
          delete require.cache[dir.path + "/images.js"];
          var packerConfig = require(dir.path + "/images.js");

          var pixiPacker = new PixiPacker(
              packerConfig,
              dir.path,
              config.dist + "/img",
              "tmp/cache"
          );

          pixiPacker.process();
          cb(null, dir)
        }))
    };
};
