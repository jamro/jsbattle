# Getting Started

If you are interested in running JsBattle locally, please read the [Installation](/docs/installation.md) section.


## Starting a challenge

JsBattle challenges is a great way to get started. It contains a set of task to accomplish ordered from the easiest to more difficult. The goal of each is to code AI of the tank that it will complete the challenge (in most cases destroy all opponents).

When you open JsBattle you will see the list of available challenges.

![alt text](/docs/img/challenges.png)

Click play button next to chosen challenge to open [Artificial Intelligence Script](/docs/manual/ai_script.md) editor:

![alt text](/docs/img/editor_screen_001.png)

It is filled by a standard, empty template. There is also a cheat sheet with most useful information on the left (to see more documentation go to [Artificial Intelligence Script](/docs/manual/ai_script.md) and its subpages).

Let's take a look at it a little bit deeper.

## Code Artificial Intelligence

```javascript
  importScripts('lib/tank.js');

  tank.init(function(settings, info) {

  });

  tank.loop(function(state, control) {

  });
```

The first line imports tank library that will be required to implement tank steering algorithm.

Callback passed to `init` function is called at the beginning of the battle and allows you to setup your tank. `loop` is called on every step of simulation processing loop and this is the place where you will put the logic of your tank.

Let's make a simple modification and add one line to `loop` callback:

```javascript
  tank.loop(function(state, control) {
    control.THROTTLE = 1;
  });
```

This implementation of the script will cause the tank to move forward at full speed by modification of its [control object](/docs/manual/tank_control_object.md).

Click **Start the Battle** to test your tank.

There should be nothing exciting yet. Your tank will probably hit the wall and destroy itself in this way :) Feel free to click **Exit** if you don't want to watch this drama :)

### Movement

Let's modify the script because our tank needs more intelligence there. The tank must avoid obstacles and search for an enemy

```javascript
importScripts('lib/tank.js');

var tartgetAngle;

tank.init(function(settings, info) {
  tartgetAngle = 0;
});

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

  control.DEBUG = {
    tartgetAngle: tartgetAngle
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

Information about collisions with walls is stored in [tank state object](/docs/manual/tank_state_object.md) at `state.collisions.wall`. Whenever this value is `true`,the desired direction of the tank should be changed randomly. It is important to stop the tank at this point so it does not hit the wall again and does not receive additional damage.

```javascript
if(state.collisions.wall) {
  tartgetAngle += Math.randomRange(45, 180);
  control.THROTTLE = 0;
}
```

`Math.randomRange` is another extension of `Math` object that is available in AI scripts and it returns a random number from  specified range. See **Extended Math Object** section in [AI Script](/docs/manual/ai_script.md) documentation for more details.

At the end of the script, there is some debug logging

```javascript
control.DEBUG = {
  tartgetAngle: tartgetAngle
}
```

You can observe how the debug object is changing over the battle by selecting your tank from **Debug View** from **Battle Screen**.

Now start the battle again by clicking **Quick Battle** and watch the new version of your AI in action.

![alt text](/docs/img/battle_screen.png)

If you are lucky, you could even earn some points because ramming is part of [scoring system](/docs/manual/scoring_system.md). Take a look also at the **Debug View**. It will show `control.DEBUG` but the [state object](/docs/manual/tank_state_object.md)

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

When an enemy is spotted, field `state.radar.enemy` will contains information about it. In such case radar and the tank should be stopped what can be done by overriding previous values of [control object](/docs/manual/tank_control_object.md):

```javascript
control.THROTTLE = 0;
control.TURN = 0;
control.RADAR_TURN = 0;
```

After that, there is a small trigonometry magic with arcus tangent function used to the determine desired angle of the gun.

```javascript
var targetAngle = Math.deg.atan2(
  state.radar.enemy.y - state.y,
  state.radar.enemy.x - state.x
);
```

When we know where the gun should be pointed, the only thing that has left is to rotate it and shoot:

```javascript
var gunAngleDifference = Math.deg.normalize(targetAngle - state.angle - state.gun.angle);
control.GUN_TURN = gunAngleDifference * 0.2;
control.SHOOT = 1;
```

Notice that to calculate `gunAngleDifference`, it is required to take into account both: angle of the tank and angle of the gun. The reason is that `state.gun.angle` is relative to tank rotation. It is described in more details in [Battle Anatomy](/docs/manual/battle_anatomy.md).

That's all. Start the battle and watch your victory.

## What's next?

Learn more about **JsBattle** mechanics by reading the [Manual](/docs/manual/README.md)
