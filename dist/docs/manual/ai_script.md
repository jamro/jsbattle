# Artificial Intelligence Scripts

## Script Structure

Each AI script must start from importing `tank.js` library. It contains core mechanism that will be required to program the tank. Importing of any other libraries is not allowed.

```javascript
importScripts('lib/tank.js');
```

Next, it is a good place to define all global variables and functions that will be used to control the tank. After that, it is time to initialize the tank. This step is optional so if you don't need to perform any actions at the beginning of the battle you can skip it. Callback passed to `tank.init()` is called only once, at the beginning of the battle and it has one argument: [settings](/docs/manual/tank_settings_object.md)

```javascript
tank.init(function(settings) {

})
```

Heart of AI logic is put in a callback that is passed to `tank.loop()`. This function will be called at each step of battle's simulation. (usually several times per second). The time between calls of `tank.loop()` may vary and depends on such factors as speed of simulation or performance of the machine that runs the app.

There are two parameters passed to loop callback: [state](/docs/manual/tank_state_object.md) and [control](/docs/manual/tank_control_object.md).

* state - contains information about the tank (e.g. position, amount of energy, radar data, ...)
* control - contains instructions used to control the behavior of the tank (e.g. throttle, turning, shooting, ...)

```javascript
tank.loop(function(state, control) {

});
```

## Example Script

Here is a very simple example of an AI script. It will keep turning clockwise and shoot bullets around. To make it more interesting, the tank will use a different power of bullets in each battle.

```javascript
importScripts('lib/tank.js');
var bulletPower;

tank.init(function(settings) {
  // use different power of bullets for each battle
  bulletPower = Math.randomRange(0.1, 1);
})

tank.loop(function(state, control) {
  control.TURN = 1;
  control.SHOOT = bulletPower;
});
```

## Debugging

To make debugging of your AI scripts easier, it is possible to pass some data from the script and display it in the battle window. It can be achieved by setting `DEBUG` field of [control object](/docs/manual/tank_control_object.md). The value of `control.DEBUG` can be anything: from objects, arrays, numbers to strings.

![alt text](img/battle_screen_001.png)

## Extended Math Object

Writing AI Scripts usually requires an application of various mathematical formulas. To make it easier, JavaScript class was extended to support additional computations.

Function                                 | Description
-----------------------------------------|-------------------------------------
**`Math.deg2rad(value)`**                | converts an angle value from degrees to radians. Returned value is normalized (between -PI and +PI)
**`Math.rad2deg(value)`**                | converts an angle value from radians to degrees. Returned value is normalized (between -180 and +180)
**`Math.deg.normalize(value)`**          | normalize an angle by increasing/decreasing it by 360 degrees so it is in range -180 and +180 degrees (excluding -180 degrees)
**`Math.deg.atan2(y, x)`**               | the same as Math.atan2, but returned values are in degrees
**`Math.rad.normalize(value)`**          | normalize an angle by increasing/decreasing it by 2*PI degrees so it is in range -PI and +PI (excluding -PI)
**`Math.rad.atan2(y, x)`**               | the same as Math.atan2 so returned values are in radians. Added just to keep notation coherent
**`Math.distance(x1, y1, x2, y2)`**      | calculates distance between point (x1, y1) and (x2, y2)
**`Math.randomRange(min, max)`**         | returns a random number from range [min; max)
