importScripts('lib/tank.js');

var turnDirection, turnTimer, direction, backTimer, boostTimer;

tank.init(function(settings, info) {
  settings.SKIN = 'forest';
  // the direction where tank will turning.
  // 1 is clockwise, -1 is couter clockwise
  turnDirection = Math.random() < 0.5 ? 1 : -1;
  turnTimer = Math.round(Math.randomRange(0, 30));
  direction = 1;
  backTimer = 0;
});

tank.loop(function(state, control) {

  if(state.collisions.enemy || state.collisions.ally) {
    backTimer = 12;
    boostTimer = 40;
  }
  if(backTimer > 0) {
    backTimer--;
    direction = -1;
  } else {
    direction = 1;
  }

  if(boostTimer > 0) {
    boostTimer--;
    control.BOOST = 1;
  } else {
    control.BOOST = 0;
  }
  control.THROTTLE = direction;

  if(!state.radar.enemy) {
    control.RADAR_TURN = 1;
    if(state.collisions.wall) {
      turnTimer = Math.round(Math.randomRange(20, 50));
    }
    if(turnTimer > 0) {
      turnTimer--;
      control.THROTTLE = 0;
      control.TURN = turnDirection;
    } else {
      control.THROTTLE = direction;
      control.TURN = 0;
    }

  } else {
    // find target angle to aim the enemy
    var targetAngle = Math.deg.atan2(
      state.radar.enemy.y - state.y,
      state.radar.enemy.x - state.x
    );

    // make sure that the angle is between (-180 and 180)
    var radarAngleDelta = Math.deg.normalize(targetAngle - (state.radar.angle + state.angle));

    // adjust radar direction to follow the target
    control.RADAR_TURN = radarAngleDelta*0.2;

    // make sure that the angle is between (-180 and 180)
    var tankAngleDelta = Math.deg.normalize(targetAngle - state.angle);


    // adjust radar direction to follow the target
    control.TURN = tankAngleDelta * 0.2;
  }

  control.DEBUG = {
    boost: state.boost
  };
  control.SHOOT = state.radar.enemy ? 0.3 : 0;
});
