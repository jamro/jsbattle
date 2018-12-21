import assert from "assert";
import sinon from "sinon";

import Bullet from "../../app/engine/Bullet.js"
import TankMock from "./mock/TankMock.js";

describe('Bullet', function() {
  describe('constructor', function() {

    it('should set power of bullet', function() {
      let bullet = new Bullet(new TankMock(), 1, 0.2);
      assert.equal(0.2, bullet.power);
      assert.equal(2.12, bullet.damage);
    });

    it('should assgin owner', function() {
      let owner = new TankMock();
      let bullet = new Bullet(owner, 1, 1);
      assert.equal(owner, bullet.owner);
    });

    it('should place bullet at the end of the gun', function() {
      let owner = new TankMock();
      let bullet = new Bullet(owner, 1, 1);
      let x = owner.x + owner.gunLength*Math.cos((owner.angle + owner.gunAngle)*(Math.PI/180));
      let y = owner.y + owner.gunLength*Math.sin((owner.angle + owner.gunAngle)*(Math.PI/180))
      assert.equal(x.toFixed(3), bullet.x.toFixed(3));
      assert.equal(y.toFixed(3), bullet.y.toFixed(3));
    });

    it('should rotate bullet as the gun', function() {
      let owner = new TankMock();
      let bullet = new Bullet(owner, 1, 1);
      let a = (owner.angle + owner.gunAngle);
      while(a > 180) a -= 360;
      while(a < -180) a += 360;
      assert.equal(a, bullet.angle);
    });

    it('should create bullet that is not exploded', function() {
      let bullet = new Bullet(new TankMock(), 1, 0);
      assert.equal(false, bullet.exploded);
    });
  });

  describe('onWallHit', function() {

    it('should explode bullet', function() {
      let bullet = new Bullet(new TankMock(), 1, 0);
      assert.equal(false, bullet.exploded);
      bullet.onWallHit();
      assert.equal(true, bullet.exploded);
    });

  });

  describe('onEnemyHit', function() {

    it('should explode bullet', function() {
      let enemy = new TankMock();
      let bullet = new Bullet(new TankMock(), 1, 1);
      assert.equal(false, bullet.exploded);
      bullet.onEnemyHit(enemy);
      assert.equal(true, bullet.exploded);
    });

    it('should deal damage to the enemy', function() {
      let enemy = new TankMock()
      let bullet = new Bullet(new TankMock(), 1, 1);
      bullet.onEnemyHit(enemy);
      assert.equal(true, enemy.onDamage.calledOnce);
      assert.equal(true, enemy.onDamage.calledWith(bullet.damage));
    });

  });

  describe('simulationStep', function() {

    it('should move according to velocity and angle', function() {
      let owner = new TankMock();
      let bullet = new Bullet(owner, 1, 0.5);

      let a = (owner.angle + owner.gunAngle)*(Math.PI/180);
      let x = bullet.x + bullet.speed*Math.cos(a);
      let y = bullet.y + bullet.speed*Math.sin(a);

      bullet.simulationStep();

      assert.equal(x.toFixed(3), bullet.x.toFixed(3));
      assert.equal(y.toFixed(3), bullet.y.toFixed(3));
    });

  });
});
