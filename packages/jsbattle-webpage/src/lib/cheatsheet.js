let settings = {
  SKIN: 'forest'
};
let info = {
  id: 3,
  team: {
    name: 'my-team',
    mates: [1, 2 , 3]
  }
};
let control = {
  THROTTLE: 0,
  BOOST: 0,
  TURN: 0,
  RADAR_TURN: 0,
  GUN_TURN: 0,
  SHOOT: 0,
  OUTBOX: [],
  DEBUG: {}
};
let state = {
  x: 39.5,
  y: 74.3,
  angle: 45.2,
  energy: 100,
  boost: 300,
  collisions: {
    enemy: false,
    ally: false,
    wall: false
  },
  radar: {
    angle: 120.4,
    targetingAlarm: false,
    wallDistance: 74,
    enemy: {
      id: 4,
      x: 39.5,
      y: 74.3,
      angle: 45.2,
      speed: 23,
      energy: 43
    },
    ally: {
      id: 4,
      x: 39.5,
      y: 74.3,
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
  },
  radio: {
    inbox: []
  }
};

export default {
  info,
  control,
  state,
  settings
};
