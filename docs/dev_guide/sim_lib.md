# JsBattle Library

You can use battle simulation library as an external dependency in your project without launching the whole game. It could be a convenient way in running the battle in your own application.

## Setup your project

At the beginning create initial structure of your project with empty folders:

```
|-- JsBattleTutorial
    |-- js
    |-- tanks
        |--lib
```
You will need two files from JsBattle projects. Download them and put into your project structure:

 - `/dist/js/jsbattle.min.js` should saved in `/js/jsbattle.min.js`
 - `/dist/tanks/lib/tank.js` should saved in `/tanks/lib/tank.js`

`jsbattle.min.js` contains core modules of battle simulation. `tank.js` includes helper modules for Web Workers where the code of tanks AI will run.

After that, Install `http-server`, we will need it later to serve website with the battle:

```bash
npm install -g http-server
```

Next, create a simple [AI Script](/docs/manual/ai_script.md) and save it at `/tanks/test.task.js`

```javascript
importScripts('lib/tank.js');

tank.init(function(settings) {

})
tank.loop(function(state, control) {
  control.THROTTLE = 0.5;
  control.TURN = 1;
});
```

It does not do much. Just turning around but it should be enough for our test.

Create `/index.html` in project root directory and fill it with following content:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>JsBattle Tutorial</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/4.5.1/pixi.min.js"></script>
    <script type="text/javascript" src="js/jsbattle.min.js"></script>
  </head>
  <body>
    <canvas id="battlefield" style="width: 900px; height: 600px"/>
    <script type="text/javascript">
      // put your code here...
    </script>
  </body>
</html>
```

This is just a basic template of an HTML page. It contains `canvas` tag where the battle will be rendered and
`script` tag where we will put our code.

You should have following files structure after this step:

```
|-- JsBattleTutorial
    |-- js
    |   |-- jsbattle.min.js
    |-- tanks
    |   |--lib
    |   |  |-- tank.js
    |   |-- test.tank.js
    |-- index.html
```

## Initialize battle simulation

Let's write some code:

```html
<script type="text/javascript">
  var canvas = document.getElementById('battlefield');
  var renderer = JsBattle.createRenderer('debug');
  renderer.init(canvas);

  var simulation = JsBattle.createSimulation(renderer);
  simulation.init(900, 600);
  for(var i=0; i < 5; i++) {
    simulation.addTank({
      name: 'test'
    });
  }
  simulation.start();
</script>
```

First lines create a renderer, attach it to a canvas and initialize it. It this example we will use `debug` renderer which is the simplest implementation of a renderer. `JsBattle` is defined in `jsbattle.min.js` and is used to initialize objects required for the simulation.

```javascript
  var canvas = document.getElementById('battlefield');
  var renderer = JsBattle.createRenderer('debug');
  renderer.init(canvas);
```

The renderer created above can be now used to create simulation object and initialize it. It is possible to change dimensions of the battlefield by passing different values to `simulation.init(width, height)`. Remember to update style setting of `canvas` tag so its dimensions match the size of the battlefield.

```javascript
  var simulation = JsBattle.createSimulation(renderer);
  simulation.init(900, 600);
```

When the simulation is ready, we can add tanks to the battle. Remember to add at least two. Otherwise, the battle will finish immediately since there will be no opponents left and the only one tank will be recognized as the winner:

```javascript
simulation.addTank({
  name: 'test'
});
```

`name` field must correspond to the filename of tank's AI. In this case, setting it to `'test'` will result in downloading AI Script from `/tanks/test.tank.js`.

When all tanks are added it is time to begin the battle:

```javascript
  simulation.start();
```

Start `http-server` and open the game in your web browser `http://127.0.0.1:8080`:

```bash
http-server -c-1
```

You should see something like that:
![alt text](/docs/img/debug_renderer_001.png)
