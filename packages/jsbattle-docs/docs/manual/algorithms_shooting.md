# Algorithms: Shooting

## Power vs rate of fire
As described in [Battle Anatomy Section](./battle_anatomy.md), you can decide about the power of fire. More powerful shots will increase reload time reducing the rate of fire.

Amount of damage that can be dealt over the same amount of time is not constant. Formulas required to calculate that can be found in [Constants and Formulas Section](./consts.md).

Using most powerful shots (`control.SHOOT=1`) can be 25% more efficient than firing weaker bullets at the maximum rate of fire (`control.SHOOT=0.1`). However, this calculation is right only under an assumption of 100% accuracy. When shooting a moving target that is hard to hit, it may be better to use a hail of bullets and increase the probability that at least some of them will hit the target.

## Predict the position of the target
It takes time for a bullet to reach the target so shooting a long distance, moving target could be difficult. The enemy may be in a different place when the bullet reaches it. In such case, it may be worth to predict the new position of the target. Most of the calculations will be based on a simple, physic formula for speed:

```
speed = distance / time
```

what also  can be written as:
```
distance = speed * time
time = distance / speed
```

Let's split that problem into a few steps:

### Predict the time when the bullet will reach the target
The accurate formula may be complicated in this case. The time needed to reach the target depends on the distance, and the distance is changing when the target is moving. However, for this particular case let's assume that the distance between your tank and the enemy will not change. Of course, it is incorrect and does not match the reality but it will make all calculations much simpler. The error introduced by this wrong assumption should be still small enough that we will hit the target.

Assume that we know the following:
- position of your tank (`state.x`, `state.y`)
- position of the enemy (`state.radar.enemy.x`, `state.radar.enemy.y`)
- speed of the bullet (`4`)

First of all, we need to calculate the distance between your tank and the enemy. It can be easily achieved using [Extended Math Object](./extended_math.md):

```javascript
  let bulletDistance = Math.distance(state.x, state.y, state.radar.enemy.x, state.radar.enemy.y);
```
Now the time required for the bullet to hit the target can be calculated using formula `time = distance / speed`:

```javascript
  let dt = bulletDistance / 4;
```

### Predict position of target after time `dt`
Assume that we know:
- the current position of the enemy (`state.radar.enemy.x`, `state.radar.enemy.y`)
- the current rotation of the enemy (`state.radar.enemy.angle`)
- the current speed of the enemy (`state.radar.enemy.speed`)
- the time that the bullet needs to hit the target (`dt`)

And we need to find coordinates of the target after time `dt`:
- `targetX`
- `targetY`

At first, we need to calculate the distance travelled over time `dt`:
```
  let enemyDistance = state.radar.enemy.speed * dt;
```

knowing the distance, the new position can be calculated using sine and cosine functions (as explained in [Geometry Algorithms](./algorithms_geometry.md)):

```
  let enemyAngle = Math.deg2rad(state.radar.enemy.angle);
  let targetX = state.radar.enemy.x + Math.cos(enemyAngle) * enemyDistance;
  let targetY = state.radar.enemy.y + Math.sin(enemyAngle) * enemyDistance;
```

### Calculate angle where the gun should be pointed
A similar case was explained in [Geometry Algorithms](./algorithms_geometry.md):

```javascript
  let targetAngle = Math.deg.atan2(targetY - state.y, targetX - state.x);
```

### Put everything together

```javascript
  let bulletDistance = Math.distance(state.x, state.y, state.radar.enemy.x, state.radar.enemy.y);
  let dt = bulletDistance / 4;

  let enemyDistance = state.radar.enemy.speed * dt;
  let enemyAngle = Math.deg2rad(state.radar.enemy.angle);

  let targetX = state.radar.enemy.x + Math.cos(enemyAngle) * enemyDistance;
  let targetY = state.radar.enemy.y + Math.sin(enemyAngle) * enemyDistance;

  let targetAngle = Math.deg.atan2(targetY - state.y, targetX - state.x);
```
