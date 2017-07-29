importScripts('lib/tank.js');

var lastEnemyData = null;

tank.loop(function(state, control) {

  if(!state.radar.enemy) {
    control.RADAR_TURN = 1;
    lastEnemyData = null;
  } else {
    // find target angle to aim the enemy
    var amingPosition = predictEnemyPosition(state);
    var targetAngle = Math.deg.atan2(
      state.radar.enemy.y - state.y,
      state.radar.enemy.x - state.x
    );
    var amingAngle = Math.deg.atan2(
      amingPosition.y - state.y,
      amingPosition.x - state.x
    );

    var radarAngleDelta = Math.deg.normalize(targetAngle - (state.radar.angle + state.angle));

    control.RADAR_TURN = radarAngleDelta*0.2;

    var gunAngleDelta = Math.deg.normalize(amingAngle - (state.gun.angle + state.angle));

    // adjust radar direction to follow the target
    control.GUN_TURN = gunAngleDelta * 0.2;

    if(Math.abs(gunAngleDelta) < 3) { // gun aimed at the target
      control.SHOOT = 1
    }
  }
});

function predictEnemyPosition(state) {
  if(!lastEnemyData || lastEnemyData.id != state.radar.enemy.id) {
    lastEnemyData = state.radar.enemy;
    return {
      x:state.radar.enemy.x,
      y:state.radar.enemy.y
    };
  }
  var x = state.radar.enemy.x;
  var y = state.radar.enemy.y;
  var vx = state.radar.enemy.x - lastEnemyData.x;
  var vy = state.radar.enemy.y - lastEnemyData.y;
  var distance = Math.distance(x, y, state.x, state.y);
  var bulletSpeed = 4;
  var delay = distance/bulletSpeed;

  //repeat to get better predition
  distance = Math.distance(x + vx*delay, y + vy*delay, state.x, state.y);
  delay = distance/bulletSpeed;

  x += vx*delay;
  y += vy*delay;

  lastEnemyData = state.radar.enemy;

  return {
    x:x,
    y:y
  };
}
