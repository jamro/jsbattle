var sinon = require('sinon');

module.exports = class BulletMock {

  constructor(owner, id, power) {
    this.id = id ? id : Math.round(Math.random()*1000000);
    this.owner = owner;
    this.power = power;
    this.x = Math.round(Math.random()*1000);
    this.y = Math.round(Math.random()*1000);
    this.angle = Math.round(Math.random()*360-180);
    this.damage = 20+Math.round(Math.random()*10);
    this.speed = 1+Math.round(Math.random()*5);
    this.exploded = false;
    this.onWallHit = sinon.spy();
    this.onEnemyHit = sinon.spy();
    this.simulationStep = sinon.spy();
  }

};
