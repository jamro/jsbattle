'use strict';

function normalizeAngle(a) {
  while(a > 180) a -= 360;
  while(a < -180) a += 360;
  return a;
}

/**
 * Object represents a tank that is involved in the battle during simulation
 */
class Tank {

  /**
   * Constructor should not be called directly but through
   * `Simulation.addTank()` method
   * @param {AiDefinition} aiDefinition - definition of tank's AI Script
   * @param {Number} id - unique id of the tank
   */
  constructor(aiDefinition, id) {
    if(typeof aiDefinition != 'object') {
      throw "AI definition must be an object";
    }
    this._id = id;
    this._name = aiDefinition.name;
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
    this._beingRammed = false;
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

  /**
   * @return unique id of the tank
   */
  get id() {
    return this._id;
  }
  /**
   * @return skin name applied to the tank
   */
  get skin() {
    return this._skin;
  }

  /**
   * @return an object that represents current state of the tank
   */
  get state() {
    return this._state;
  }

  /**
   * @return amount of energy that the tank has
   */
  get energy() {
    return this._energy;
  }

  /**
   * @return current score of the tank
   */
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

  /**
   * @return initial amount of the energy
   */
  get maxEnergy() {
    return this._maxEnergy;
  }

  /**
   * @return range of tank's radar
   */
  get radarRange() {
    return this._radarRange;
  }

  /**
   * @return angle that radar field covers
   */
  get radarFocal() {
    return this._radarFocal;
  }

  /**
   * @return name of the tank
   */
  get name() {
    return this._name;
  }

  /**
   * @return full name contains name of the tank and its unique ID
   */
  get fullName() {
    return this._name + " #" + this._id;
  }

  /**
   * @return x position of the tank
   */
  get x() {
    return this._x;
  }

  /**
   * @return y position of the tank
   */
  get y() {
    return this._y;
  }

  /**
   * @return linear speed of the tank
   */
  get speed() {
    return this._speed;
  }

  get gunLength() {
    return 25;
  }

  /**
   * @return rotation of tank's body
   */
  get angle() {
    return this._angle;
  }

  /**
   * @return current throttle of the tank
   */
  get throttle() {
    return this._throttle;
  }
  /**
   * @return true if tank has boost turned on. Otherwise false
   */
  get hasBoost() {
    return (this._hasBoost && this._boost > 0);
  }

  /**
   * @return amount of boost that has left
   */
  get boost() {
    return this._boost;
  }

  /**
   * @return initial amount of boost
   */
  get maxBoost() {
    return this._maxBoost;
  }

  /**
   * @return rotation of tank's gun (relative to tank's body)
   */
  get gunAngle() {
    return this._gunAngle;
  }

  /**
   * @return rotation of tank's radar (relative to tank's body)
   */
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
    this._beingRammed = true;
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

  /**
   * @return true if tank is on the radar of an enemy. Otherwise false
   */
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

  /**
   * @return debug data set by AI script via `control.DEBUG`
   */
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
    if(this._beingRammed) {
      // must be done later because ramming is
      // reported after collisionResolver.checkTank(self)
      // it is detected when collisionResolver.checkTank
      // is called for attacing tank
      self._enemyHit = true;
      this._beingRammed = false;
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
}

module.exports = Tank;
