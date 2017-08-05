var beep = require('beepbeep')
module.exports = function (gulp, config, plugins) {
    return function () {
      beep();
    };
};
