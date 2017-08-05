var sinon = require('sinon');

module.exports = class TankMock {

  constructor(name, id) {
    this.name = name ? name : "bravo_" + Math.round(Math.random()*1000);
    this.id = id ? id : Math.round(Math.random()*1000000);
    this.angle = Math.round(Math.random()*360-180);
    this.gunAngle = Math.round(Math.random()*360-180);
    this.radarAngle = Math.round(Math.random()*360-180);
    this.radarRange = Math.round(300+Math.random()*200);
    this.x = Math.round(Math.random()*1000);
    this.y = Math.round(Math.random()*1000);
    this.gunLength = 20+Math.round(Math.random()*50);
    this.energy = 20+Math.round(Math.random()*50);

    this.onDamage = sinon.spy()
    this.setThrottle = sinon.spy()
    this.setTurn = sinon.spy()
    this.setGunTurn = sinon.spy()
    this.setRadarTurn = sinon.spy()
    this.setDebugData = sinon.spy()
    this.setBoost = sinon.spy()
    this.shoot = sinon.spy()
    this.simulationStep = sinon.spy();
    this.randomize = sinon.spy();
    this.moveTo = sinon.spy();
    this.onSurviveScore = sinon.spy();
    this.onWallHit = sinon.spy();
    this.onEnemyHit = sinon.spy();
    this.onBeingRam = sinon.spy();
    this.onEnemyHitScore = sinon.spy();
    this.onEnemySpot = sinon.spy();
    this.onBulletSpot = sinon.spy();
    this.onTargetingAlarm = sinon.spy();
    this.onWallSpot = sinon.spy();
  }

};
