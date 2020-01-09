# Challenge #3 Walkthrough

```javascript
importScripts('lib/tank.js');

tank.init(function(settings, info) {
  // initialize tank here
});

tank.loop(function(state, control) {
  let enemy = state.radar.enemy;
  // Keep scannig until you find the enemy
  if(!enemy) {
    control.RADAR_TURN = 1;
  } else {
    control.RADAR_TURN = 0;
  }

  // Aim at the target when found
  if(enemy) {
    // Calculate desired direction of the gun.
    // If you need additional explanation on math operations
    // read the docs: Algorithms / Geometry Basics
    const targetAngle = Math.deg.atan2(enemy.y - state.y, enemy.x - state.x);
    const gunAngle = Math.deg.normalize(targetAngle - state.angle);

    // point the gun at the target
    const turnSpeed = 0.1;
    const angleDiff = Math.deg.normalize(gunAngle - state.gun.angle);
    control.GUN_TURN = turnSpeed * angleDiff;

    // keep shooting
    control.SHOOT = 1;
  }
});
```
