# Bundled Enemies

JsBattle comes with a set of enemies that are bundled with game distribution. This chapter explains some of their implementation details.

## Dummy

### Strategy

It literally does nothing. No movement, no shooting. **Dummy** could be a pretty good target for the start when you are testing your own tank.

### Source Code

```javascript
importScripts('lib/tank.js');

tank.init(function(settings) {
  settings.SKIN = 'forest';
});

tank.loop(function(state, control) {

});
```

## Crawler

### Strategy

Moving through the battlefield searching for the enemy. It turns every time when hitting a wall and keep going. **Crawler** is not actively scanning for enemies however, when it spots a target in front of the radar, it will shoot.

### Source Code

```javascript
importScripts('lib/tank.js');

var turnDirection, turnTimer;

tank.init(function(settings) {
  settings.SKIN = 'forest';
  // the direction where tank will turning.
  // 1 is clockwise, -1 is counter clockwise
  turnDirection = Math.random() < 0.5 ? 1 : -1;
  turnTimer = Math.round(Math.randomRange(0, 30));
})

tank.loop(function(state, control) {

  // when hit an obstacle, start turning until
  // time of turnTimer doesn't run out
  if(state.collisions.wall || state.collisions.enemy) {
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

```

## Crazy

### Strategy

Not much strategy here. Just keep turning and shooting in all directions. Maybe some bullets will hit a target :) Could be a good enemy when testing bullets dodging algorithms.

### Source Code

```javascript
importScripts('lib/tank.js');

tank.init(function(settings) {
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

```

## Chicken

### Strategy

Goes to one of corners of the battlefield and shoot bullets around.

### Source Code

```javascript
importScripts('lib/tank.js');

/* moves tank in defined direction
* @param targetAngle - direction of movement
* @param state - state object of the tank
* @param control - control object of the tank
* @param done - callback executed when tank is close to the wall and the movement is over
*/
function goToDirection(targetAngle, state, control, done) {
  var angleDelta = Math.deg.normalize(targetAngle - state.angle);
  control.TURN = angleDelta * 0.2;
  // use boost to hide in corner ASAP
  control.BOOST = 1;

  // if any enemy on the radar - shoot!
  if(state.radar.enemy) {
    control.SHOOT = 1;
  } else {
    control.SHOOT = 0;
  }

  if(Math.abs(angleDelta) < 5) {
    // do not move forward if an enemy is on your way
    if(state.collisions.enemy) {
      control.THROTTLE = 0;
    } else {
      control.THROTTLE = 1;
    }
    // finish movement when close to a wall
    if(state.radar.wallDistance && state.radar.wallDistance < 50) {
      control.THROTTLE = 0;
      control.TURN = 0;
      control.BOOST = 0;
      done();
    }
  }
}

// strategy of moving north/south
// used at the beginning to go close to a wall
function goVerticalStrategy(state, control) {
  goToDirection(verticalAngle, state, control, function() {
    // when done - go to a corner
    strategy = goHorizontalStrategy;
  });
  control.DEBUG.strategy = "goVerticalStrategy:" + verticalAngle;
}

// strategy of moving east/west
// used when you are close to the wall so you can find a corner
function goHorizontalStrategy(state, control) {
  goToDirection(horizontalAngle, state, control, function() {
    // when done - start shooting
    strategy = shootStrategy;
  });
  control.DEBUG.strategy = "goHorizontalStrategy:" + horizontalAngle;
}

// shoot wave of bullets
function shootStrategy(state, control) {
  // 20*Math.sin(timer*0.1) cause rotation +-20 degrees over the time
  var angleDelta = Math.deg.normalize(shootAngle + 20*Math.sin(timer*0.1) - state.angle);
  control.TURN = angleDelta * 0.2;
  control.SHOOT = 0.1;
  control.DEBUG.strategy = "shootStrategy:" + shootAngle;
}

// strategy function that is currently used
var strategy;

// random direction of the tank that results in vertical movement (north or south)
var verticalAngle;
// random direction of the tank that results in horizontal movement (east or west)
var horizontalAngle;
// best direction to shoot when the tank is hidden i battlefield's corner
var shootAngle;
// timer used to change shooting angle over the time
var timer = 0;

tank.init(function(settings) {
  settings.SKIN = 'forest';

  // randomize direction of tank movement
  verticalAngle = Math.random() < 0.5 ? -90 : +90;
  horizontalAngle = Math.random() < 0.5 ? 0 : -180;
  // find direction that is opposite to the corner where the tank is
  shootAngle = Math.deg.normalize(verticalAngle + horizontalAngle)/2;
  if(horizontalAngle == 0) {
    shootAngle += 180;
  }

  // start from moving north/south
  strategy = goVerticalStrategy;
});

tank.loop(function(state, control) {
  // execute current strategy
  strategy(state, control);
  timer++;
});
```

## Dodge

### Strategy

There are a few elements of the strategy:
- Find an enemy and keep it on your radar
- Have perpendicularly position and move sideways to avoid bullets
- Keep shooting the target

This tank is not moving through the battle field to search for an enemy. The only reason to move is to dodge a bullet.

### Source Code

```javascript
importScripts('lib/tank.js');

// keep information about all bullets that was spot
var bulletMap;
// avoid bullets by movement in random direction.
// avoidDirection = 1: move forward
// avoidDirection = -1: move backward
var avoidDirection;

// initialize your tank
tank.init(function(settings) {
  settings.SKIN = 'forest';
  bulletMap = [];
  changeAvoidDirection();
});

// randomly change direction of movement
function changeAvoidDirection() {
  avoidDirection = Math.random() > 0.5 ? -1 : 1;
}

tank.loop(function(state, control) {
  var i, bullet, bodyAngleDelta;

  // Rotate radar around to find an enemy.
  // When enemy found, keep radar beam on him
  if(state.radar.enemy) {
    // calculate angle of the enemy relating to your tank
    // this is the angle that you should aim your radar and gun to
    var enemyAngle = Math.deg.atan2(
      state.radar.enemy.y - state.y,
      state.radar.enemy.x - state.x
    )
    // calculate the difference between current and desired angle
    // of the radar.
    var radarAngleDelta = Math.deg.normalize(enemyAngle - (state.radar.angle + state.angle));
    // Turn the radar. If the difference between current and desired
    // angle is getting smaller, speed of turning will get lower too.
    // When the difference will be zero, turning will stop.
    control.RADAR_TURN = radarAngleDelta * 0.2;

    // Turn body of the tank so it is perpendicular to the enemyAngle
    // it will be easier to dodge bullets by moving back and forth
    bodyAngleDelta = Math.deg.normalize(enemyAngle - 90 - state.angle);
    if(Math.abs(bodyAngleDelta) > 90) bodyAngleDelta += 180;
    control.TURN = bodyAngleDelta * 0.2;

    // aim your gun at the enemy
    var gunAngleDelta = Math.deg.normalize(enemyAngle - (state.gun.angle + state.angle));
    control.GUN_TURN = gunAngleDelta*0.2;

    // shoot if you have aimed at the enemy
    control.SHOOT = 0.1;

  } else {
    // keep searching for opponents
    control.TURN = 0;
    control.RADAR_TURN = 1;
    bodyAngleDelta = 180;
  }

  // find bullets using radar
  for(i in state.radar.bullets) {
    bullet = state.radar.bullets[i];
    bullet.age = 0;
    bulletMap[bullet.id] = bullet;

    // calculate velocity components and distance between bullet and the tank
    bullet.vx = bullet.speed * Math.cos(bullet.angle*(Math.PI/180));
    bullet.vy = bullet.speed * Math.sin(bullet.angle*(Math.PI/180));
    bullet.tankDistance = Math.distance(state.x, state.y, bullet.x, bullet.y);
  }

  var bulletCount = 0;
  // predict position of all bullets scanned so far
  for(i in bulletMap) {
    bullet = bulletMap[i];
    if(!bullet) continue;
    // skip bullets that was not updated for long time
    // if they were not spotted by radar recently, they
    // probably are too far or hit something
    if(bullet.age > 50) {
      bulletMap[i] = null;
      continue;
    }
    // track age of the bullet so they can be removed if out-dated
    bullet.age++;
    // predict position of the bullet basing on its velocity
    bullet.x += bullet.vx;
    bullet.y += bullet.vy;
    // calculate distance between bullet and the tank. It will be used to
    // find how fast the distance is changing
    var newDistance = Math.distance(state.x, state.y, bullet.x, bullet.y);
    bullet.approachingSpeed = bullet.tankDistance - newDistance;
    bullet.tankDistance = newDistance;

    // If distance between tank and the bullet is negative, it means that it
    // is moving away from the tank and can be ignored (if will not hit it)
    //
    // In addition, if the speed of approaching the tank is too low, it means
    // that the trajectory of the bullet is away of the tank and it will
    // not hit it. Such bullets can be ignored too. The threshold value set
    // experimentally to 3.85
    if(bullet.approachingSpeed < 3.85) {
      bulletMap[i] = null;
      continue;
    }
    // count how many bullets are really dangerous and will probably hit the tank
    bulletCount++;
  }

  // avoid bullets when any of them is aiming at you and
  // you are rotated in a way that you can dodge it
  if(bulletCount && Math.abs(bodyAngleDelta) < 45) {
    control.BOOST = 1;
    control.THROTTLE = avoidDirection;
  } else {
    control.BOOST = 0;
    control.THROTTLE = 0;
    // change direction of bullets dodging
    changeAvoidDirection();
  }
});

```

## Sniper

### Strategy
Find a target by scanning surroundings and keep shooting it. Sniper never moves

### Source Code

```javascript
importScripts('lib/tank.js');

var enemyMap, power;

tank.init(function(settings) {
  settings.SKIN = 'forest';
  enemyMap = [];
  power = Math.random()*0.9 + 0.1;
})

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

```

## Kamikaze

### Strategy
Crush the enemy by diving into it. Kamikaze uses the boost to increase collision force.

### Source Code

```javascript
importScripts('lib/tank.js');

var turnDirection, turnTimer, direction, backTimer, boostTimer;

tank.init(function(settings) {
  settings.SKIN = 'forest';
  // the direction where tank will turning.
  // 1 is clockwise, -1 is couter clockwise
  turnDirection = Math.random() < 0.5 ? 1 : -1;
  turnTimer = Math.round(Math.randomRange(0, 30));
  direction = 1;
  backTimer = 0;
})

tank.loop(function(state, control) {

  if(state.collisions.enemy) {
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

```
