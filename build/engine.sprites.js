const through = require('through2');
const PixiPacker = require('pixi-packer');

module.exports = function (gulp, config, plugins) {
  return function () {
    // Hack: Avoid require-cache
    delete require.cache[__dirname + "/../" + config.engine.resources + "/images.js"];
    var packerConfig = require(__dirname + "/../" + config.engine.resources + "/images.js");

    var pixiPacker = new PixiPacker(
        packerConfig,
        __dirname + "/../" + config.engine.resources,
        config.dist + "/img",
        "tmp/cache"
    );

    return pixiPacker.process();
  }
}
