# Tank Settings Object

Settings object is passed to `tank.init(function(settings) { ... })` of [AI Scripts](/docs/manual/ai_script.md). You can modify its properties to change initial settings of your tank. For example:

```javascript
  tank.init(function(settings) {
    settings.SKIN = 'lava';
  });
```

Here is how the structure of settings object looks like:

```javascript
  {
    SKIN: 'forest'
  }
```

Name             | Possible Values   | Description
-----------------|-------------------|----------------------------------------
**SKIN**         | forest, desert, ocean, lava, black, zebra, tiger  | Changes painting of the tank


## Tank Skins
Preview                                  | Configuration
-----------------------------------------|--------------------------
![alt text](img/tank_skin_forest.png)    | `settings.SKIN = 'forest'`
![alt text](img/tank_skin_desert.png)    | `settings.SKIN = 'desert'`
![alt text](img/tank_skin_ocean.png)     | `settings.SKIN = 'ocean'`
![alt text](img/tank_skin_lava.png)      | `settings.SKIN = 'lava'`
![alt text](img/tank_skin_black.png)     | `settings.SKIN = 'black'`
![alt text](img/tank_skin_zebra.png)     | `settings.SKIN = 'zebra'`
![alt text](img/tank_skin_tiger.png)     | `settings.SKIN = 'tiger'`
