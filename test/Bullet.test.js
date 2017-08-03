var assert = require('assert');
var sinon = require('sinon');

var Bullet = require('../app/scripts/Bullet.js');
var TankMock = require('./mock/TankMock.js');

describe('Bullet', function() {
  describe('constructor', function() {

    it('should set power of bullet', function() {
      var bullet = new Bullet(new TankMock(), 1, 0.2);
      assert.equal(0.2, bullet.power);
      assert.equal(2.12, bullet.damage);
    });

    it('should assgin owner', function() {
      var owner = new TankMock();
      var bullet = new Bullet(owner, 1, 1);
      assert.equal(owner, bullet.owner);
    });

    it('should place bullet at the end of the gun', function() {
      var owner = new TankMock();
      var bullet = new Bullet(owner, 1, 1);
      var x = owner.x + owner.gunLength*Math.cos((owner.angle + owner.gunAngle)*(Math.PI/180));
      var y = owner.y + owner.gunLength*Math.sin((owner.angle + owner.gunAngle)*(Math.PI/180))
      assert.equal(x.toFixed(3), bullet.x.toFixed(3));
      assert.equal(y.toFixed(3), bullet.y.toFixed(3));
    });

    it('should rotate bullet as the gun', function() {
      var owner = new TankMock();
      var bullet = new Bullet(owner, 1, 1);
      var a = (owner.angle + owner.gunAngle);
      while(a > 180) a -= 360;
      while(a < -180) a += 360;
      assert.equal(a, bullet.angle);
    });

    it('should create bullet that is not exploded', function() {
      var bullet = new Bullet(new TankMock(), 1, 0);
      assert.equal(false, bullet.exploded);
    });
  });

  describe('onWallHit', function() {

    it('should explode bullet', function() {
      var bullet = new Bullet(new TankMock(), 1, 0);
      assert.equal(false, bullet.exploded);
      bullet.onWallHit();
      assert.equal(true, bullet.exploded);
    });

  });

  describe('onEnemyHit', function() {

    it('should explode bullet', function() {
      var enemy = new TankMock();
      var bullet = new Bullet(new TankMock(), 1, 1);
      assert.equal(false, bullet.exploded);
      bullet.onEnemyHit(enemy);
      assert.equal(true, bullet.exploded);
    });

    it('should deal damage to the enemy', function() {
      var enemy = new TankMock()
      var bullet = new Bullet(new TankMock(), 1, 1);
      bullet.onEnemyHit(enemy);
      assert.equal(true, enemy.onDamage.calledOnce);
      assert.equal(true, enemy.onDamage.calledWith(bullet.damage));
    });

  });

  describe('simulationStep', function() {

    it('should move according to velocity and angle', function() {
      var owner = new TankMock();
      var bullet = new Bullet(owner, 1, 0.5);

      var a = (owner.angle + owner.gunAngle)*(Math.PI/180);
      var x = bullet.x + bullet.speed*Math.cos(a);
      var y = bullet.y + bullet.speed*Math.sin(a);

      bullet.simulationStep();

      assert.equal(x.toFixed(3), bullet.x.toFixed(3));
      assert.equal(y.toFixed(3), bullet.y.toFixed(3));
    });

  });
});
