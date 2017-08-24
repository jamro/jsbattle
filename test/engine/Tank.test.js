import assert from "assert";
import sinon from "sinon";

import Tank from "../../app/engine/Tank.js"
import TankMock from "./mock/TankMock.js";
import CollisionResolverMock from "./mock/CollisionResolverMock.js";

describe('Tank', function() {
  describe('constructor', function() {

    it('should set name of the tank', function() {
      let tank = new Tank({name: 'beta'}, 1);
      assert.equal("beta", tank.name);
    });

    it('should set energy to max', function() {
      let tank = new Tank({name: 'bravo'}, 1);
      assert.equal(tank.energy, tank.maxEnergy);
    });

    it('should set boost to max', function() {
      let tank = new Tank({name: 'bravo'}, 1);
      assert.equal(tank.boost, tank.maxBoost);
    });
  });

  describe('onEnemyHitScore', function() {

    it('should award scores equal to damage', function() {
      let tank = new Tank({name: 'bravo'}, 1);
      assert.equal(0, tank.score);
      tank.onEnemyHitScore(0.1);
      assert.equal(0.1, tank.score);
      tank.onEnemyHitScore(21.2);
      assert.equal(21.3, tank.score);
    });

  });

  describe('onEnemyKillScore', function() {

    it('should award 20 scores', function() {
      let tank = new Tank({name: 'bravo'}, 1);
      assert.equal(0, tank.score);
      tank.onEnemyKillScore();
      assert.equal(20, tank.score);
      tank.onEnemyKillScore();
      assert.equal(40, tank.score);
    });

  });

  describe('onSurviveScore', function() {

    it('should award 10 scores', function() {
      let tank = new Tank({name: 'bravo'}, 1);
      assert.equal(0, tank.score);
      tank.onSurviveScore();
      assert.equal(10, tank.score);
      tank.onSurviveScore();
      assert.equal(20, tank.score);
    });

  });

  describe('setBoost', function() {

    it('should turn on/off boost', function() {
      let tank = new Tank({name: 'bravo'}, 1);
      assert(!tank.hasBoost);
      tank.setBoost(true);
      assert(tank.hasBoost);
      tank.setBoost(false);
      assert(!tank.hasBoost);
    });

    it('should not turn boost on if the boost is out', function() {
      let tank = new Tank({name: 'bravo'}, 1);
      tank.setBoost(true);
      let resolver = new CollisionResolverMock();
      for(let i =0; i < tank.maxBoost; i++) {
          assert(tank.hasBoost);
          tank.simulationStep(resolver);
      }
      assert(!tank.hasBoost);
      tank.setBoost(true);
      assert(!tank.hasBoost);
      tank.setBoost(false);
      assert(!tank.hasBoost);
    });

  });

  describe('onWallHit', function() {

    it('should change state of the tank', function() {
      let tank = new Tank({name: 'bravo'}, 1);

      let resolver = new CollisionResolverMock();
      tank.simulationStep(resolver);
      assert(!tank.state.collisions.wall);

      resolver.checkTank = function() {
        tank.onWallHit();
      }
      tank.simulationStep(resolver);
      assert(tank.state.collisions.wall);
    });

    it('should deal damage', function() {
      let tank = new Tank({name: 'bravo'}, 1);
      let maxEnergy = tank.maxEnergy;
      assert.equal(maxEnergy, tank.energy);
      tank.onWallHit();
      assert.equal(maxEnergy-0.2, tank.energy);
      tank.onWallHit();
      assert.equal(maxEnergy-0.4, tank.energy);
    });

  });

  describe('onEnemyHit', function() {

    it('should change state of the tank', function() {
      let tank = new Tank({name: 'bravo'}, 1);

      let resolver = new CollisionResolverMock();
      tank.simulationStep(resolver);
      assert(!tank.state.collisions.enemy);

      resolver.checkTank = function() {
        tank.onEnemyHit();
      }
      tank.simulationStep(resolver);
      assert(tank.state.collisions.enemy);
    });

    it('should deal damage', function() {
      let tank = new Tank({name: 'bravo'}, 1);
      let maxEnergy = tank.maxEnergy;
      assert.equal(maxEnergy, tank.energy);
      tank.onWallHit();
      assert.equal(maxEnergy-0.2, tank.energy);
      tank.onWallHit();
      assert.equal(maxEnergy-0.4, tank.energy);
    });

  });

  describe('onBeingRam', function() {

    it('should deal damage', function() {
      let tank = new Tank({name: 'bravo'}, 1);
      let e1 = tank.energy;
      tank.onBeingRam(0);
      let e2 = tank.energy;
      tank.onBeingRam(0.5);
      let e3 = tank.energy;
      tank.onBeingRam(1);
      let e4 = tank.energy;

      let d1 = e1 - e2;
      let d2 = e2 - e3;
      let d3 = e3 - e4;

      assert(e1 > e2 && e2 > e3 && e3 > e4, "energy did not drop " + e1 + " > " + e2 + " > " + e3 + " > " + e4);
      assert(d1 < d2 && d2 < d3, "damage did not increase " + d1 + " < " + d2 + " < " + d3);
    });

  });

  describe('onEnemySpot', function() {

    it('should change state of the tank', function() {
      let tank = new Tank({name: 'bravo'}, 1);

      let resolver = new CollisionResolverMock();
      tank.simulationStep(resolver);
      assert(!tank.state.radar.enemy);
      let enemy = new TankMock();
      resolver.scanTanks = function() {
        tank.onEnemySpot(enemy);
      }
      tank.simulationStep(resolver);
      assert(tank.state.radar.enemy);
      assert.equal(enemy.id, tank.state.radar.enemy.id);
      assert.equal(enemy.x, tank.state.radar.enemy.x);
      assert.equal(enemy.y, tank.state.radar.enemy.y);
      assert.equal(enemy.angle, tank.state.radar.enemy.angle);
      assert.equal(enemy.energy, tank.state.radar.enemy.energy);
    });

  });

  describe('onDamage', function() {

    it('should deal damage', function() {
      let tank = new Tank({name: 'bravo'}, 1);
      let maxEnergy = tank.maxEnergy;
      assert.equal(maxEnergy, tank.energy);
      tank.onDamage(6);
      assert.equal(maxEnergy-6, tank.energy);
      tank.onDamage(10);
      assert.equal(maxEnergy-16, tank.energy);
      tank.onDamage(1000000);
      assert.equal(0, tank.energy);
    });

  });


  describe('moveTo', function() {

    it('should change position of the tank', function() {
      let tank = new Tank({name: 'bravo'}, 1);
      tank.moveTo(345, 567);
      assert.equal(345, tank.x);
      assert.equal(567, tank.y);

      tank.moveTo(0.123, 0.432);
      assert.equal(0.123, tank.x);
      assert.equal(0.432, tank.y);
    });

    it('should not affect tank speed', function() {
      let tank = new Tank({name: 'bravo'}, 1);
      assert.equal(0, tank.speed);
      tank.moveTo(345, 567);
      assert.equal(0, tank.speed);
      let resolver = new CollisionResolverMock();
      tank.simulationStep(resolver);
      assert.equal(0, tank.speed);
    });

  });

  describe('handleShoot', function() {

    it('should return power of shoot', function() {
      let tank = new Tank({name: 'bravo'}, 1);
      tank.shoot(0.3);
      assert.equal(0.3, tank.handleShoot());
      tank = new Tank({name: 'bravo'}, 1);
      tank.shoot(1);
      assert.equal(1, tank.handleShoot());
    });

    it('should return power of shot only once', function() {
      let tank = new Tank({name: 'bravo'}, 1);
      tank.shoot(0.7);
      assert.equal(0.7, tank.handleShoot());
      assert.equal(0, tank.handleShoot());
    });

  });

  describe('shoot', function() {

    it('should be blocked when reloading', function() {
      let tank = new Tank({name: 'bravo'}, 1);
      assert(!tank.isReloading);
      tank.shoot(1);
      tank.handleShoot()
      assert(tank.isReloading);
      tank.shoot(1);
      assert.equal(0, tank.handleShoot());
    });

  });

  describe('randomize', function() {

    it('should rotate the tank', function() {
      let tank = new Tank({name: 'bravo'}, 1);
      let pos1 = tank.angle;
      tank.randomize();
      let pos2 = tank.angle;
      tank.randomize();
      let pos3 = tank.angle;

      let diff1 = pos1 != pos2;
      let diff2 = pos2 != pos3;
      let diff3 = pos3 != pos1;

      assert(diff1 || diff2 || diff3);
    });

  });

  describe('simulationStep', function() {

    it('should move the tank', function() {
      let tank = new Tank({name: 'bravo'}, 1);
      let oldPos = tank.x + ":" + tank.y;
      tank.setThrottle(1);
      let resolver = new CollisionResolverMock();
      for(let i=0; i< 5; i++) {
        tank.simulationStep(resolver);
      }
      let newPos = tank.x + ":" + tank.y;

      assert.notEqual(oldPos, newPos);
    });

    it('should rotate the tank', function() {
      let tank = new Tank({name: 'bravo'}, 1);
      let oldPos = tank.angle;
      tank.setTurn(1);
      let resolver = new CollisionResolverMock();
      for(let i=0; i< 5; i++) {
        tank.simulationStep(resolver);
      }
      let newPos = tank.angle;

      assert.notEqual(oldPos, newPos);
    });

    it('should rotate the gun', function() {
      let tank = new Tank({name: 'bravo'}, 1);
      let oldPos = tank.gunAngle;
      tank.setGunTurn(1);
      let resolver = new CollisionResolverMock();
      for(let i=0; i< 5; i++) {
        tank.simulationStep(resolver);
      }
      let newPos = tank.gunAngle;

      assert.notEqual(oldPos, newPos);
    });

    it('should rotate the radar', function() {
      let tank = new Tank({name: 'bravo'}, 1);
      let oldPos = tank.radarAngle;
      tank.setRadarTurn(1);
      let resolver = new CollisionResolverMock();
      for(let i=0; i< 5; i++) {
        tank.simulationStep(resolver);
      }
      let newPos = tank.radarAngle;

      assert.notEqual(oldPos, newPos);
    });

    it('should not move the tank if collide', function() {
      let tank = new Tank({name: 'bravo'}, 1);
      tank.moveTo(34, 56);
      let oldPos = tank.x + ":" + tank.y;
      tank.setThrottle(1);
      let resolver = new CollisionResolverMock();
      resolver.checkTank.returns(false);
      for(let i=0; i< 5; i++) {
        tank.simulationStep(resolver);
      }
      let newPos = tank.x + ":" + tank.y;

      assert.equal(oldPos, newPos);
    });

    it('should update tank state', function() {
      let tank = new Tank({name: 'bravo'}, 1);
      tank.moveTo(34, 56);
      let resolver = new CollisionResolverMock();
      tank.simulationStep(resolver);
      let oldPos = tank.state.x + ":" + tank.state.y;
      tank.setThrottle(1);
      for(let i=0; i< 5; i++) {
        tank.simulationStep(resolver);
      }
      let newPos = tank.state.x + ":" + tank.state.y;

      assert.notEqual(oldPos, newPos);
    });

  });




});
