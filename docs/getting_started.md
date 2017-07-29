# Getting Started

## Installation

JsBattle requires a web server to run. Install `http-server` package via NPM:

```bash
  npm install -g http-server
```

Now you can download JsBattle project. Go to `/dist` directory and run http server there:

```bash
  cd ./dist
  http-server -c-1
```

The script will output address of your web server:

```
  Starting up http-server, serving ./
  Available on:
    http://127.0.0.1:8080
  Hit CTRL-C to stop the server
```

Open your favorite web browser and navigate to URL from the previous step

```
  http://127.0.0.1:8080
```

It will open a page where you can watch battle of your tanks

## Code Artificial Intelligence

### Bootstrap

To create your own tank, you will need to write an [Artificial Intelligence Script](/manual/ai_script). Navigate to `/dist/js/tanks` and create a file `newbie.tank.js` there with such script

```javascript
  importScripts('lib/tank.js');

  tank.init(function() {

  })

  tank.loop(function(state, control) {
    control.THROTTLE = 1;
  });
```

Callback passed to `init` function is called at the beginning of the battle and allows you to setup your tank. `loop` is called on every step of simulation processing loop and this is the place where you will put the logic of your tank.

This implementation of the script will cause the tank to move forward at full speed by modification of [control object](/manual/tank_control_object).

Now, you need to add your new tank to list of tanks that will join the battle. Open `/dist/js/tanks/index.json` and change it to:

```json
[
  "dummy",
  "newbie"
]
```
`dummy` is one of pre-build tanks and it will be your first enemy. Now navigate to `http://127.0.0.1:8080` and watch the battle.

There should be nothing exciting yet. Your tank will probably hit the wall and destroy itself in this way :)

### Movement

Let's modify the script and add more intelligence there. The tank must avoid obstacles and search for an enemy

```javascript
importScripts('lib/tank.js');

var tartgetAngle;

tank.init(function() {
  tartgetAngle = 0;
})

tank.loop(function(state, control) {

  // turn tank in target direction
  var angleDifference = Math.deg.normalize(tartgetAngle - state.angle);
  control.TURN = angleDifference*0.2;

  // move forward if pointed to correct direction
  if(Math.abs(angleDifference) < 5) {
    control.THROTTLE = 1;
  } else {
    control.THROTTLE = 0;
  }

  // change direction when hit the wall
  if(state.collisions.wall) {
    tartgetAngle += Math.randomRange(45, 180);
    control.THROTTLE = 0;
  }

});
```

`targetAngle` is a desired rotation of the tank. It will be changed randomly on every wall hit. At the beginning `targetAngle=0` so the tank will start from moving to the east. Following two lines of code turn the tank to the desired direction:

```javascript
var angleDifference = Math.deg.normalize(tartgetAngle - state.angle);
control.TURN = angleDifference*0.2;
```

`Math.deg.normalize` allows normalizing the angle so it is always between -180 and 180 degrees. If the difference between current and desired angle is positive, `control.TURN` will be set to a positive value and start moving clockwise. Otherwise, the rotation will be counter clockwise. If the difference between angles drops down, then `control.TURN` will be reduced too and thus speed of rotation will decrease.

```javascript
if(Math.abs(angleDifference) < 5)
```

This condition ensures that tank is moving forward only when the difference between current and desired angle is smaller than 5 degrees.

Information about collisions with walls is stored in [tank state object](/manual/tank_state_object) at `state.collisions.wall`. Whenever this value is `true`,the desired direction of the tank should be changed randomly. It is important to stop the tank at this point so it does not hit the wall again and does not receive additional damage.

```javascript
if(state.collisions.wall) {
  tartgetAngle += Math.randomRange(45, 180);
  control.THROTTLE = 0;
}
```

`Math.randomRange` is another extension of `Math` object that is available in AI scripts and it returns a random number from  specified range. See **Extended Math Object** section in [AI Script](/manual/ai_script#) documentation for more details.

Now navigate to `http://127.0.0.1:8080` and watch the new version of your AI in action.

### Aiming and shooting

Now, we need to add logic that allows to aim and shoot the target. Add following code at the end of your `loop` callback:

```javascript
tank.loop(function(state, control) {

  // ...

  // keep turning the radar
  control.RADAR_TURN = 1;
  if(state.radar.enemy) {
    control.THROTTLE = 0;
    control.TURN = 0;
    control.RADAR_TURN = 0;

    // calculate desired angle of the gun
    // so it will be pointed to the enemy
    var targetAngle = Math.deg.atan2(
      state.radar.enemy.y - state.y,
      state.radar.enemy.x - state.x
    );

    // turn the gun
    var gunAngleDifference = Math.deg.normalize(targetAngle - state.angle - state.gun.angle);
    control.GUN_TURN = gunAngleDifference*0.2;

    // keep shooting
    control.SHOOT = 1;
  }
});
```
Setting `control.RADAR_TURN=1` will keep the radar constantly rotating clockwise.

When an enemy is spotted, field `state.radar.enemy` will contains information about it. In such case radar and the tank should be stopped what can be done by overriding previous values of [control object](/manual/tank_control_object):

```javascript
control.THROTTLE = 0;
control.TURN = 0;
control.RADAR_TURN = 0;
```

After that, there is a small trigonometry magic with arcus tangens function to the determine desired angle of the gun. When we know where the gun should be pointed, the only thing that has left is to rotate it and shoot:

```javascript
var gunAngleDifference = Math.deg.normalize(targetAngle - state.angle - state.gun.angle);
control.GUN_TURN = gunAngleDifference*0.2;
control.SHOOT = 1;
```

Notice that to calculate `gunAngleDifference`, it is required to take into account both: angle of the tank and angle of the gun. The reason is that `state.gun.angle` is relative to tank rotation.

That's all. Now go to `http://127.0.0.1:8080` and watch your victory.

## What's next?

Learn more about JsBattle mechanics by reading the manual:

- [Battle Anatomy](/manual/battle_anatomy)
- [Tank Anatomy](/manual/tank_anatomy)
- [AI Script](/manual/ai_script)
- [Tank State Object](/manual/tank_state_object)
- [Tank Control Object](/manual/tank_control_object)
- [Scoring System](/manual/scoring_system)
- [Constants and Formulas](/manual/consts)

You can try to modify your AI script and test is against more powerful opponents:

- crawler
- crazy
- dodge
- kamikaze
- sniper
- super-sniper
