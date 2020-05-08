importScripts('lib/tank.js');

var turnDirection, turnTimer;

tank.init(function(settings, info) {
  settings.SKIN = 'forest';
  // the direction where tank will turning.
  // 1 is clockwise, -1 is couter clockwise
  turnDirection = Math.random() < 0.5 ? 1 : -1;
  turnTimer = Math.round(Math.randomRange(0, 30));
});

tank.loop(function(state, control) {

  // when hit an obstacle, start turning until
  // time of turnTimer doesn't run out
  if(state.collisions.wall || state.collisions.enemy || state.collisions.ally) {
    turnTimer = Math.round(Math.randomRange(20, 50));
  }
  if(turnTimer > 0) {
    turnTimer--;
    // when turnTimer is on, do not move forward because there is
    // probably an obstacle in front of you. Turn instead.
    control.THROTTLE = 0;
    control.TURN = turnDirection;
  } else {
    // keep going forward at full speed
    control.THROTTLE = 1;
    control.TURN = 0;
  }
  // Shoot whenever you see an enemy
  if(state.radar.enemy) {
    control.SHOOT = 0.5;
  }
});
