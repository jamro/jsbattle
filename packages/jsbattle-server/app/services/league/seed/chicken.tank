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
    // do not move forward if a tank is on your way
    if(state.collisions.enemy || state.collisions.ally) {
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

tank.init(function(settings, info) {
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
