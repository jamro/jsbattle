importScripts('lib/tank.js');

// keep informatoin about all bullets that was spot
var bulletMap;
// avoid bullets by movement in random direction.
// avoidDirection = 1: move forward
// avoidDirection = -1: move backward
var avoidDirection;

// initialize your tank
tank.init(function(settings, info) {
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
    );
    // calculate the difference between current and desired angle
    // of the radar.
    var radarAngleDelta = Math.deg.normalize(enemyAngle - (state.radar.angle + state.angle));
    // Turn the radar. If the difference betwen current and desired
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
    // In addition, if the speed of approaching the tank is to low, it means
    // that the trajectory of the bullet is away of the tank and it will
    // not hit it. Such bullets can be ignored too. The threshold alue set
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
    // change direction of bullets doddging
    changeAvoidDirection();
  }
});
