# Challenge #1 Walkthrough

```javascript
importScripts('lib/tank.js');

tank.init(function(settings, info) {
  // initialize tank here
});

tank.loop(function(state, control) {
  // Change control object to start shooting.
  // The loop() function is called at each simulation
  // step resulting in continuous fire.
  control.SHOOT = 1;
});
```
