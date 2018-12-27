'use strict';

export default class Bullet {

  constructor(owner, id, power) {
    this._id = id;
    this._owner = owner;
    this._angle = owner.angle + owner.gunAngle;
    while(this._angle > 180) this._angle -= 360;
    while(this._angle < -180) this._angle += 360;
    this._x = owner.x + owner.gunLength*Math.cos(this._angle*(Math.PI/180));
    this._y = owner.y + owner.gunLength*Math.sin(this._angle*(Math.PI/180));
    this._speed = 4;
    this._power = power;
    this._damage = Math.round(1000 * power + 300 * power * power) * 0.01;
    this._exploded = false;
  }

  get id() {
    return this._id;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get angle() {
    return this._angle;
  }

  get speed() {
    return this._speed;
  }

  get damage() {
    return this._damage;
  }

  get power() {
    return this._power;
  }
  get owner() {
    return this._owner;
  }

  get exploded() {
    return this._exploded;
  }

  onWallHit() {
    this._exploded = true;
  }

  onEnemyHit(enemy) {
    this._exploded = true;
    enemy.onDamage(this._damage);
  }

  simulationStep() {
    this._x += this._speed*Math.cos(this._angle*(Math.PI/180));
    this._y += this._speed*Math.sin(this._angle*(Math.PI/180));
  }
}
