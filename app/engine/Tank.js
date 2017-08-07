'use strict';

function normalizeAngle(a) {
  while(a > 180) a -= 360;
  while(a < -180) a += 360;
  return a;
}

module.exports = class Tank {

  constructor(name, id) {
    this._id = id;
    this._name = name;
    this._maxEnergy = 100;
    this._energy = this._maxEnergy;
    this._x = 0;
    this._y = 0;
    this._lastX = 0;
    this._lastY = 0;
    this._angle = 0;
    this._gunAngle = 0;
    this._radarAngle = 0;
    this._throttle = 0;
    this._actualThrottle = 0;
    this._speed = 0;
    this._turn = 0;
    this._gunTurn = 0;
    this._radarTurn = 0;
    this._wallHit = false;
    this._enemyHit = false;
    this._radarRange = 300;
    this._radarFocal = 6;
    this._enemySpot = null;
    this._bulletsSpot = [];
    this._gunReloadTime = 70;
    this._gunTimer = 0;
    this._shootingPower = 0;
    this._targetingAlarmTimer = 0;
    this._debugData = {};
    this._score = 0;
    this._state = null;
    this._hasBoost = false;
    this._maxBoost = 400;
    this._boost = this._maxBoost;
    this._wallDistance = null;
    this._skin = 'zebra';
  }

  get id() {
    return this._id;
  }

  get skin() {
    return this._skin;
  }

  get state() {
    return this._state;
  }

  get energy() {
    return this._energy;
  }

  get score() {
    return this._score;
  }

  onEnemyHitScore(damage) {
    this._score += damage;
  }

  onEnemyKillScore() {
    this._score += 20;
  }

  onSurviveScore() {
    this._score += 10;
  }

  get maxEnergy() {
    return this._maxEnergy;
  }

  get radarRange() {
    return this._radarRange;
  }

  get radarFocal() {
    return this._radarFocal;
  }

  get name() {
    return this._name;
  }

  get fullName() {
    return this._name + " #" + this._id;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get speed() {
    return this._speed;
  }

  get gunLength() {
    return 25;
  }

  get angle() {
    return this._angle;
  }

  get throttle() {
    return this._throttle;
  }

  get hasBoost() {
    return (this._hasBoost && this._boost > 0);
  }

  get boost() {
    return this._boost;
  }

  get maxBoost() {
    return this._maxBoost;
  }

  get gunAngle() {
    return this._gunAngle;
  }

  get radarAngle() {
    return this._radarAngle;
  }

  get enemySpot() {
    return this._enemySpot;
  }

  setThrottle(v) {
    this._throttle = Math.min(1, Math.max(-1, v));
  }

  setTurn(v) {
    this._turn = Math.min(1, Math.max(-1, v));
  }

  setGunTurn(v) {
    this._gunTurn = Math.min(1, Math.max(-1, v));
  }

  setRadarTurn(v) {
    this._radarTurn = Math.min(1, Math.max(-1, v));
  }

  setBoost(v) {
    this._hasBoost = v ? true : false;
  }

  setDebugData(v) {
    this._debugData = v;
  }

  onWallHit() {
    this._wallHit = true;
    this.onDamage(0.2);
  }

  onEnemyHit() {
    this._enemyHit = true;
    this.onDamage(0.2);
  }

  onBeingRam(speed) {
    this.onDamage(0.1 + Math.round(speed*8)*0.1);
  }

  onEnemySpot(enemy) {
    this._enemySpot = enemy;
  }

  onBulletSpot(bullet) {
    this._bulletsSpot.push(bullet);
  }

  onWallSpot(distance) {
    this._wallDistance = distance;
  }

  onTargetingAlarm() {
    this._targetingAlarmTimer = 3;
  }

  get targetingAlarm() {
    return this._targetingAlarmTimer > 0;
  }

  onDamage(damage) {
    this._energy = Math.max(0, this._energy - damage);
  }

  moveTo(xPosition, yPosition) {
    this._x = xPosition;
    this._y = yPosition;
    this._lastX = xPosition;
    this._lastY = yPosition;
  }

  get debugData() {
    return this._debugData;
  }

  get isShooting() {
    return this._shootingPower > 0;
  }

  get shootingPower() {
    return this._shootingPower;
  }

  handleShoot() {
    var value = this._shootingPower;
    this._shootingPower = 0;
    return value;
  }

  get isReloading() {
    return this._gunTimer > 0;
  }

  shoot(value) {
    value = Math.max(0.1, Math.min(1, value));
    if(!this.isReloading) {
      this._gunTimer = Math.round(value*this._gunReloadTime);
      this._shootingPower = value;
    }
  }

  randomize() {
    this._angle = Math.round(360*Math.random())-180;
  }

  init(settings) {
    if(settings && settings.SKIN) {
      this._skin = settings.SKIN;
    }
  }

  simulationStep(collisionResolver) {
    var self = this;

    if(self._energy == 0) {
      return;
    }

    if(self._hasBoost && self._boost > 0) {
      self._boost--;
    }

    var oldX = self._x;
    var oldY = self._y;

    var maxSpeed = self._throttle * (self.hasBoost ? 4 : 2);
    var accelerationFactor = (self.hasBoost ? 10 : 20);
    self._actualThrottle += (maxSpeed - self._actualThrottle)/accelerationFactor;

    var v = self._actualThrottle;
    var rotation = self._angle*(Math.PI/180);
    self._x += v*Math.cos(rotation);
    self._y += v*Math.sin(rotation);
    self._wallHit = false;
    self._enemyHit = false;
    var hitTest = !collisionResolver.checkTank(self);
    if(hitTest) {
      self._x = oldX;
      self._y = oldY;
      self._actualThrottle = 0;
    }

    self._angle += 2*self._turn;
    self._radarAngle += 6*self._radarTurn;
    self._gunAngle += 3*self._gunTurn;

    self._angle = normalizeAngle(self._angle);
    self._radarAngle = normalizeAngle(self._radarAngle);
    self._gunAngle = normalizeAngle(self._gunAngle);
    collisionResolver.updateTank(self);

    self._enemySpot = null;
    self._wallDistance = null;
    self._targetingAlarmTimer = Math.max(0, self._targetingAlarmTimer-1);
    collisionResolver.scanTanks(self);
    collisionResolver.scanBullets(self);
    collisionResolver.scanWalls(self);

    if(self._gunTimer > 0) {
      self._gunTimer--;
    }

    var enemyData = null;
    var bulletsData = [];
    while(self._bulletsSpot.length) {
      var bullet = self._bulletsSpot.shift();
      bulletsData.push({
        id: bullet.id,
        x: bullet.x,
        y: bullet.y,
        angle: bullet.angle,
        speed: bullet.speed,
        damage: bullet.damage
      });
    }

    if(self._enemySpot) {
      enemyData = {
        id: self._enemySpot.id,
        x: self._enemySpot.x,
        y: self._enemySpot.y,
        angle: self._enemySpot.angle,
        speed: self._enemySpot.speed,
        energy: self._enemySpot.energy,
      };
    }

    var dx = self._x - self._lastX;
    var dy = self._y - self._lastY;
    self._speed = Math.sqrt(dx*dx + dy*dy);

    self._lastX = self._x;
    self._lastY = self._y;

    self._state = {
      x: self._x,
      y: self._y,
      angle: self._angle,
      energy: self._energy,
      boost: self._boost,
      collisions: {
        wall: self._wallHit,
        enemy: self._enemyHit
      },
      radar: {
        angle: self._radarAngle,
        targetingAlarm: self.targetingAlarm,
        wallDistance: self._wallDistance,
        enemy: enemyData,
        bullets: bulletsData
      },
      gun: {
        angle: self._gunAngle,
        reloading: self.isReloading
      }
    };
  }
};
