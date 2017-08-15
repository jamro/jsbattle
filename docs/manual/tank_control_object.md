# Tank Control Object

Following object is used to control the behavior of the tank in [AI Scripts](/docs/manual/ai_script.md):

```javascript
  {
    THROTTLE: 0,
    BOOST: 0,
    TURN: 0,
    RADAR_TURN: 0,
    GUN_TURN: 0,
    SHOOT: 0,
    OUTBOX: [],
    DEBUG: {}
  }
```

Name             | Possible Values   | Description
-----------------|-------------------|----------------------------------------
**THROTTLE**     | [-1; 1]           | Changes speed that the tank. Zero means that the tank is stopped. Negative values result in backward movement. Keep in mind that the tank needs some time to accelerate to its maximum speed.
**BOOST**        | 0 or 1            | Turn boost on. It allows doubling maximum speed of the tank and its acceleration. The amount of boost is limited. When tank run out of boost, modification of this parameter will not cause any effects
**TURN**         | [-1; 1]           | Changes speed and direction of tank's turning. Zero means that the tank is not turning. Positive values cause clockwise movement, negatives - counter clockwise
**RADAR_TURN**   | [-1; 1]           | Changes speed and direction of radar's turning. Zero means that the radar is not turning. Positive values cause clockwise movement, negatives - counter clockwise
**GUN_TURN**     | [-1; 1]           | Changes speed and direction of gun's turning. Zero means that the gun is not turning. Positive values cause clockwise movement, negatives - counter clockwise
**SHOOT**        | [0.1; 1]          | Fires a bullet in the direction where the gun is aiming. Provided value determine how powerful the bullet will be. Bigger value results in more damage but also longer reloading time. More powerful bullets may deal up to 30% more damage over the same period of time than smaller ones
**OUTBOX**       | Array of Objects  | List of messages that should be broadcast to team members. It could be list of any objects
**DEBUG**        | Object            | An object with data that can be assigned to the tank and viewed during simulation. Allows to monitor internal parameters of AI script and to debug it
