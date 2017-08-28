importScripts('lib/tank.js');

tank.init(function(settings) {
  });
  tank.loop(function(state, control) {
    control.THROTTLE = 1;
  });
