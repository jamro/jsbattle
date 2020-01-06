# Algorithms: Movement

## Bouncing off the walls
The simplest algorithm to move across the battlefield and seek for an enemy could be:
1. Move forward until hitting a wall or finding an enemy
2. Stop and exit the algorithm if an enemy found
3. After a collision with a wall, stop and turn any direction
4. Go to point #1

![bouncing](../img/bouncing.png)

A quite obvious downside of such an approach is that each collision will damage the tank. However, stopping the tank after each wall hit should limit the damage, so it is acceptable when fighting easy enemies.

```javascript
importScripts('lib/tank.js');

// timer of tank turns. Whenever the tank hits a wall, the timer
// will be set to a positive integer. Within each simulation step
// the timer will be decreased by one, eventually hitting zero.
// The tank will keep turning as long as turnTime is above zero.
// In that way, turning will be sustained for several steps of
// the simulation
var turnTime;

tank.init(function(settings, info) {
  // do not turn at the beginning
  turnTime = 0;
});

tank.loop(function(state, control) {
  // scan for an enemy until finding one
  if(!state.radar.enemy) {
  	control.RADAR_TURN = 1;
  } else {
    control.RADAR_TURN = 0;
  }

  if(state.collisions.wall || turnTime > 0 || state.radar.enemy) {
    control.THROTTLE = 0;
  } else {
    control.THROTTLE = 1;
  }

  if(state.collisions.wall) {
    // start turning when hitting a wall
    turnTime = 10;
  }

  // keep turning whenever turn timer is above zero
  // reduce the timer with each step of the simulation
  if(turnTime > 0) {
    control.TURN = 1;
    turnTime--;
  } else {
    control.TURN = 0;
  }
});


```
