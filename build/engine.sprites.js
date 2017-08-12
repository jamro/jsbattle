const through = require('through2');
const PixiPacker = require('pixi-packer');

module.exports = function (gulp, config, plugins) {
  if(config.devMode) {
    plugins.util.log(plugins.util.colors.yellow("engine.sprites disabled in dev mode"));
    return function () {
      return gulp.src('.').pipe(plugins.util.noop());
    }
  }
  return function () {
    // Hack: Avoid require-cache
    delete require.cache[__dirname + "/../" + config.engine.resources + "/images.js"];
    var packerConfig = require(__dirname + "/../" + config.engine.resources + "/images.js");

    var pixiPacker = new PixiPacker(
        packerConfig,
        __dirname + "/../" + config.engine.resources,
        config.dist + "img",
        "tmp/cache"
    );

    return pixiPacker.process();
  }
}
