# Tank State Object

Here is an example of an object that describes the state of the tank. It is used
in [AI Scripts](ai_script) as an input to control the behavior of the tank.

```javascript
  {
    x: 39.5,
    y: 74.3
    angle: 45.2,
    energy: 100,
    boost: 300,
    collisions: {
      enemy: false,
      wall: false
    },
    radar: {
      angle: 120.4,
      targetingAlarm: false,
      wallDistance: 74,
      enemy: {
        id: 4,
        x: 39.5,
        y: 74.3
        angle: 45.2,
        speed: 23,
        energy: 43
      },
      bullets: [
        {
          id: 4,
          x: 94,
          y: 3,
          angle: -43,
          speed: 45,
          damage: 9
        }
      ]
    },
    gun: {
      angle: -34.5,
      reloading: false
    }
  }
```

## Tank Data

Name                       | Description
---------------------------|------------------------------------------------------
**x**                      | x coordinate of the tank
**y**                      | y coordinate of the tank
**angle**                  | rotation of the tank in degrees. Possible values are between -180 and 180. Zero means that the tank is aiming right (east)
**energy**                 | amount of energy that has left. When energy is zero the tank is destroyed
**boost**                  | amount of boost that has left.

## Collisions Data

Name                       | Description
---------------------------|------------------------------------------------------
**collisions.wall**        | true if tank hit a wall, otherwise false
**collisions.enemy**       | true if tank hit an enemy, otherwise false

## Radar Data

Name                       | Description
---------------------------|------------------------------------------------------
**radar.angle**            | rotation of the radar relative to tank's rotation. Possible values are between -180 and 180. Zero means that the radar is aiming at the same direction as front of the tank
**radar.targetingAlarm**   | true if the tank has been spotted on radar of any enemy
**radar.wallDistance**     | distance from a wall where the radar is pointed to. Null if there is no wall in range of the radar

### Enemy Data

Name                       | Description
---------------------------|------------------------------------------------------
**radar.enemy**            | if an enemy is spot, the object contains information about it. Otherwise, the value is null
**radar.enemy.id**         | unique ID of enemy's tank
**radar.enemy.x**          | x coordinate of the enemy
**radar.enemy.y**          | y coordinate of the enemy
**radar.enemy.angle**      | rotation of the enemy in degrees
**radar.enemy.speed**      | linear speed of the enemy

### Bullet Data

Name                       | Description
---------------------------|------------------------------------------------------
**radar.bullets**          | list of bullets spotted by radar. Bullets fired by the tank that run radar scan are ignored
**radar.bullets[].id**     | unique id of bullet
**radar.bullets[].x**      | x position of bullet
**radar.bullets[].y**      | y position of bullet
**radar.bullets[].angle**  | angle of bullet
**radar.bullets[].speed**  | speed of bullet
**radar.bullets[].damage** | damage dealt by bullet

## Gun Data

Name                       | Description
---------------------------|------------------------------------------------------
**gun.angle**              | rotation of the gun relative to tank's rotation. Possible values are between -180 and 180. Zero means that the gun s aiming at the same direction as front of the tank
**gun.reloading**          | after each shoot, the gun must be reloaded and it cannot shoot again until reload is finished. The value is true if the gun is being reloaded. Otherwise false.
