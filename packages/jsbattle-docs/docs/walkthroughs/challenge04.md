# Challenge #4 Walkthrough

```javascript
importScripts('lib/tank.js');

// SHOOT ENEMY ---------------------------------------------------------------------------------
function shootEnemy(state, control) {
  let enemy = state.radar.enemy;
  if(!enemy) {
    return;
  }

  // predict position of moving target
  let bulletSpeed = 4;
  let distance = Math.distance(state.x, state.y, enemy.x, enemy.y)
  let bulletTime = distance / bulletSpeed;
  let targetX = enemy.x + bulletTime * enemy.speed * Math.cos(Math.deg2rad(enemy.angle));
  let targetY = enemy.y + bulletTime * enemy.speed * Math.sin(Math.deg2rad(enemy.angle));

  // calculate desired direction of the gun
  let targetAngle = Math.deg.atan2(targetY - state.y, targetX - state.x);
  let gunAngle = Math.deg.normalize(targetAngle - state.angle);

  // point the gun at the target
  let angleDiff = Math.deg.normalize(gunAngle - state.gun.angle);
  control.GUN_TURN = 0.3 * angleDiff;

  // shoot when aiming at target
  if(Math.abs(angleDiff) < 1) {
    control.SHOOT = 0.5;
  }
}

// SCAN ENEMY ---------------------------------------------------------------------------------
function scanEnemy(state, control) {
  if(!state.radar.enemy) {
    // scan around for the enemy
    control.RADAR_TURN = 1;
  } else {
    //keep the enemy in the middle of radar beam
    let targetAngle = Math.deg.atan2(state.radar.enemy.y - state.y, state.radar.enemy.x - state.x);
    let radarAngle = Math.deg.normalize(targetAngle - state.angle);
    let angleDiff = Math.deg.normalize(radarAngle - state.radar.angle);
    control.RADAR_TURN = angleDiff;
  }
}

// -------------------------------------------------------------------------------------------
tank.init(function(settings, info) {
  // initialize tank here
});

tank.loop(function(state, control) {
  scanEnemy(state, control);
  shootEnemy(state, control);
});
```
