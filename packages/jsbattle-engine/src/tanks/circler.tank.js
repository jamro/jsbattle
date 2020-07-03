// Author: Jonathan Cross
importScripts('lib/tank.js');

let wander_turn_counter;
let circle_dir;
let boost_counter;
let prev_energy;

tank.init(function(settings, info) {
  settings.SKIN = "forest";

  wander_turn_counter = 0;
  circle_dir = 1.0;
  boost_counter = 0;
  prev_energy = 100;
});

function controlGun(state, control) {
  if (!state.radar.enemy) {
    // Fire randomly in the hope to hit something by luck.
    control.GUN_TURN = 1;
    control.SHOOT = 0.1;
    return;
  }

  // Predict where the enemy will be to adjust the gun angle.
  let enemy = state.radar.enemy;
  let bullet_speed = 4;
  let distance = Math.distance(state.x, state.y, enemy.x, enemy.y);
  let bullet_time = distance / bullet_speed;
  let target = {x: enemy.x + bullet_time * enemy.speed * Math.cos(Math.deg2rad(enemy.angle)),
                y: enemy.y + bullet_time * enemy.speed * Math.sin(Math.deg2rad(enemy.angle))};
  let enemy_angle = Math.deg.atan2(target.y - state.y, target.x - state.x);
  let gun_angle_diff = Math.deg.normalize(enemy_angle - state.gun.angle - state.angle);

  control.GUN_TURN = 0.3 * gun_angle_diff;
  control.SHOOT = 0.1;
}

function controlRadar(state, control) {
  if (!state.radar.enemy) {
    control.RADAR_TURN = 1;
    return;
  }

  // Try to keep the radar fixed on the enemy.
  let dx = state.radar.enemy.x - state.x;
  let dy = state.radar.enemy.y - state.y;
  let enemy_angle = Math.deg.atan2(dy, dx);
  let radar_angle_diff = Math.deg.normalize(enemy_angle - state.radar.angle - state.angle);
  control.RADAR_TURN = 0.3 * radar_angle_diff;
}

// Just go in straight lines; if we hit a wall then turn randomly.
function wander(state, control) {
  if (wander_turn_counter > 0) {
    wander_turn_counter--;
    control.TURN = -1.0;
    control.THROTTLE = 0.0;
    return;
  }

  control.TURN = 0.0;
  control.THROTTLE = 1.0;

  if (state.collisions.wall) {
    wander_turn_counter = Math.round(Math.randomRange(40, 70));
  }
}

// Circle around an enemy, changing direction if we
// hit something to avoid getting stuck.
function circleEnemy(state, control) {
  if (state.collisions.wall || state.collisions.enemy) {
    circle_dir *= -1;
  }

  let enemy = state.radar.enemy;

  // Get the unit vector from us to the enemy.
  let r = Math.distance(state.x, state.y, enemy.x, enemy.y);
  let u = {x: (enemy.x - state.x) / r,
           y: (enemy.y - state.y) / r};

  // Find the target point to move toward.  In the coordinate system
  // where our tank is to the west and the enemy is to the east,
  // the target point is 150 units west of the enemy, and
  // either 100 north or 100 south, depending on circle_dir.
  let target = {x: enemy.x - 150*u.x - 100*circle_dir*u.y,
                y: enemy.y - 150*u.y + 100*circle_dir*u.x};
  let target_angle = Math.deg.atan2(target.y - state.y, target.x - state.x);
  let target_angle_diff = Math.deg.normalize(target_angle - state.angle);

  // Move toward target_angle.  If we need to turn more than 90 degrees,
  // then reverse direction and turn the opposite way.
  let forwards = Math.abs(target_angle_diff) > 90 ? -1.0 : 1.0;
  control.TURN = forwards * 0.5 * target_angle_diff;
  control.THROTTLE = forwards * 1.0;
}

function controlBoost(state, control) {
  if (boost_counter > 0) {
    control.BOOST = 1;
    boost_counter--;
  } else {
    control.BOOST = 0;
  }

  // If we took damage, then enable boost for a short time to get away.
  if (prev_energy != state.energy) {
    boost_counter = 10;
  }
  prev_energy = state.energy;
}

function controlMovement(state, control) {
  if (!state.radar.enemy) {
    wander(state, control);
  } else {
    circleEnemy(state, control);
  }
}

tank.loop(function(state, control) {
  controlRadar(state, control);
  controlGun(state, control);
  controlMovement(state, control);
  controlBoost(state, control);
});
