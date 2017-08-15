# Cooperative Mode

To turn Cooperative mode on, check "Enable Team Mode for tanks of the same type" option below battle's **Start** button:

![alt text](/docs/img/cooperative_001.png)

In this mode, tanks that have the same name (and thus are based on the same AI Script), will cooperate. It will cause several changes in game mechanics.

## Scoring System

Points are awarded in [the same way as in standard mode](/docs/manual/scoring_system.md) however, all of them will be summed up for each team. The team that has the highest amount of points wins.

## Collisions

When your tank hit an ally from the team, it will not be reported by `state.collisions.enemy` flag, but you will see that `state.collisions.ally` has changed to true in tank's [state object](/docs/manual/tank_state_object.md):

```javascript
state = {
  ...
  collisions: {
    enemy: false,
    ally: true,
    wall: false
  },
  ...
}
```

## Radar

The radar detects closest enemy and closest ally separately. Those information is available at `state.radar.enemy` and `state.radar.ally` of [state object](/docs/manual/tank_state_object.md):

```javascript
state = {
  ...
  radar: {
    ...
    enemy: {
      id: 4,
      x: 39.5,
      y: 74.3,
      angle: 45.2,
      speed: 3.2,
      energy: 43
    },
    ally: {
      id: 4,
      x: 50.2,
      y: 90.1,
      angle: 13.1,
      speed: 2,
      energy: 90
    }
  }
  ...
}
```

## Team Information

You will receive all informations about your team on initialization in [info object](/docs/manual/tank_info_object.md)

```javascript
tank.init(function(settings, info) {
  console.log(info.team.mates); // print IDs of team members
})
```

List of team members has always the same order. If you would like to assign different roles to each member of the team you can base on this list. For example, assign algorithm #1 to info.team.mates[0], algorithm #2 to info.team.mates[1], etc...

## Communications

Tanks from the same team can communicate. Messages can be any JavaScript object and are broadcast to all members of the team. However, a tank cannot send a message to itself. All messages are not delivered immediately  but in the next step of processing loop.

To send a message, add it to `control.OUTBOX` array:

```javascript
control.OUTBOX.push({
  foo: "bar"
});
```

All your team mates will receive it in `state.radar.inbox`:

```javascript
console.log(state.radar.inbox)
// [ {foo: "bar"} ]
```
