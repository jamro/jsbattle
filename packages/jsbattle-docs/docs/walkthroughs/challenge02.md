# Challenge #2 Walkthrough

```javascript
importScripts('lib/tank.js');

tank.init(function(settings, info) {
  // initialize tank here
});

tank.loop(function(state, control) {
  // calculate desired direction of the gun.
  // Take into account rotation of the tank
  const targetAngle = 45
  const gunAngle = Math.deg.normalize(targetAngle - state.angle);

  // point the gun at the target.
  const turnSpeed = 0.1;
  const angleDiff = Math.deg.normalize(gunAngle - state.gun.angle);
  control.GUN_TURN = turnSpeed * angleDiff;

  // keep shooting
  control.SHOOT = 1;
});
```
