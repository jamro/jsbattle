var seedrandom = require("seedrandom");
var extendedMath = require("./extendedMath.js");

Math = extendedMath(); // jshint ignore:line

Math.random = function() {
  throw "Cannot use Math.random outside of tank.init(...) or tank.loop(...) callbacks! Sorry!";
};


(function(self) {
  if(!self) {
    console.warn("self is not defined");
    return;
  }

  class TankController {
    constructor() {
      this._initCallback = function() {};
      this._loopCallback = function() {};
      var self = this;

      onmessage = function (tankStateEvent) {
        switch(tankStateEvent.data.command) {

          case 'init':
            var seed = tankStateEvent.data.seed;
            var settings = tankStateEvent.data.settings;
            var info = tankStateEvent.data.info;

            Math.random = seedrandom(seed);
            self._initCallback(settings, info);
            postMessage({type: 'init', settings: settings});
            break;

          case 'update':
            var state = tankStateEvent.data.state;
            var control = tankStateEvent.data.control;
            if(self._loopCallback) {
              self._loopCallback(state, control);
              postMessage(control);
            } else {
              postMessage(control);
            }
            break;
        }
      };
    }

    loop(callback) {
      this._loopCallback = callback;
    }

    init(callback) {
      this._initCallback = callback;
    }
  }

  self.tank = new TankController();

})(self);
