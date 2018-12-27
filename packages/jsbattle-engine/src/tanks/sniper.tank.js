importScripts('lib/tank.js');

var power;

tank.init(function(settings, info) {
  settings.SKIN = 'forest';
  power = Math.random()*0.9 + 0.1;
});

tank.loop(function(state, control) {

  if(!state.radar.enemy) {
    control.RADAR_TURN = 1;
  } else {
    // find target angle to aim the enemy
    var targetAngle = Math.deg.atan2(
      state.radar.enemy.y - state.y,
      state.radar.enemy.x - state.x
    );

    var radarAngleDelta = Math.deg.normalize(targetAngle - (state.radar.angle + state.angle));

    // adjust radar direction to follow the target
    control.RADAR_TURN = radarAngleDelta*0.2;

    var gunAngleDelta = Math.deg.normalize(targetAngle - (state.gun.angle + state.angle));

    // adjust radar direction to follow the target
    control.GUN_TURN = gunAngleDelta * 0.2;

    if(Math.abs(gunAngleDelta) < 3) { // gun aimed at the target
      control.SHOOT = power;
    }
    control.DEBUG = "power=" + power.toFixed(2);
  }
});
