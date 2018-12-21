importScripts('lib/tank.js');

tank.init(function(settings, info) {
  settings.SKIN = 'forest';
});

tank.loop(function(state, control) {
  // keep shooting
  control.GUN_TURN = 1;
  // keep turning the radar because it is fun :)
  // there is no reason to do that :)
  control.RADAR_TURN = -1;
  // keep shooting bullets. Make them small
  // but shoot them frequently
  control.SHOOT = 0.1;

});
