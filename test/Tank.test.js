var assert = require('assert');
var sinon = require('sinon');

var Tank = require('../app/scripts/Tank.js');
var TankMock = require('./mock/TankMock.js');
var CollisionResolverMock = require('./mock/CollisionResolverMock.js');

describe('Tank', function() {
  describe('constructor', function() {

    it('should set name of the tank', function() {
      var tank = new Tank("beta");
      assert.equal("beta", tank.name);
    });

    it('should set unique id', function() {
      var tank1 = new Tank("one");
      var tank2 = new Tank("two");
      var tank3 = new Tank("three");

      assert.notEqual(tank1.id, tank2.id);
      assert.notEqual(tank2.id, tank3.id);
      assert.notEqual(tank3.id, tank1.id);
    });

    it('should set energy to max', function() {
      var tank = new Tank("beta");
      assert.equal(tank.energy, tank.maxEnergy);
    });

    it('should set boost to max', function() {
      var tank = new Tank("beta");
      assert.equal(tank.boost, tank.maxBoost);
    });
  });

  describe('onEnemyHitScore', function() {

    it('should award scores equal to damage', function() {
      var tank = new Tank("beta");
      assert.equal(0, tank.score);
      tank.onEnemyHitScore(0.1);
      assert.equal(0.1, tank.score);
      tank.onEnemyHitScore(21.2);
      assert.equal(21.3, tank.score);
    });

  });

  describe('onEnemyKillScore', function() {

    it('should award 20 scores', function() {
      var tank = new Tank("beta");
      assert.equal(0, tank.score);
      tank.onEnemyKillScore();
      assert.equal(20, tank.score);
      tank.onEnemyKillScore();
      assert.equal(40, tank.score);
    });

  });

  describe('onSurviveScore', function() {

    it('should award 10 scores', function() {
      var tank = new Tank("beta");
      assert.equal(0, tank.score);
      tank.onSurviveScore();
      assert.equal(10, tank.score);
      tank.onSurviveScore();
      assert.equal(20, tank.score);
    });

  });

  describe('setBoost', function() {

    it('should turn on/off boost', function() {
      var tank = new Tank("beta");
      assert(!tank.hasBoost);
      tank.setBoost(true);
      assert(tank.hasBoost);
      tank.setBoost(false);
      assert(!tank.hasBoost);
    });

    it('should not turn boost on if the boost is out', function() {
      var tank = new Tank("beta");
      tank.setBoost(true);
      var resolver = new CollisionResolverMock();
      for(var i =0; i < tank.maxBoost; i++) {
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
      var tank = new Tank();

      var resolver = new CollisionResolverMock();
      tank.simulationStep(resolver);
      assert(!tank.state.collisions.wall);

      resolver.checkTank = function() {
        tank.onWallHit();
      }
      tank.simulationStep(resolver);
      assert(tank.state.collisions.wall);
    });

    it('should deal damage', function() {
      var tank = new Tank();
      var maxEnergy = tank.maxEnergy;
      assert.equal(maxEnergy, tank.energy);
      tank.onWallHit();
      assert.equal(maxEnergy-0.2, tank.energy);
      tank.onWallHit();
      assert.equal(maxEnergy-0.4, tank.energy);
    });

  });

  describe('onEnemyHit', function() {

    it('should change state of the tank', function() {
      var tank = new Tank();

      var resolver = new CollisionResolverMock();
      tank.simulationStep(resolver);
      assert(!tank.state.collisions.enemy);

      resolver.checkTank = function() {
        tank.onEnemyHit();
      }
      tank.simulationStep(resolver);
      assert(tank.state.collisions.enemy);
    });

    it('should deal damage', function() {
      var tank = new Tank();
      var maxEnergy = tank.maxEnergy;
      assert.equal(maxEnergy, tank.energy);
      tank.onWallHit();
      assert.equal(maxEnergy-0.2, tank.energy);
      tank.onWallHit();
      assert.equal(maxEnergy-0.4, tank.energy);
    });

  });

  describe('onBeingRam', function() {

    it('should deal damage', function() {
      var tank = new Tank();
      var e1 = tank.energy;
      tank.onBeingRam(0);
      var e2 = tank.energy;
      tank.onBeingRam(0.5);
      var e3 = tank.energy;
      tank.onBeingRam(1);
      var e4 = tank.energy;

      var d1 = e1 - e2;
      var d2 = e2 - e3;
      var d3 = e3 - e4;

      assert(e1 > e2 && e2 > e3 && e3 > e4, "energy did not drop " + e1 + " > " + e2 + " > " + e3 + " > " + e4);
      assert(d1 < d2 && d2 < d3, "damage did not increase " + d1 + " < " + d2 + " < " + d3);
    });

  });

  describe('onEnemySpot', function() {

    it('should change state of the tank', function() {
      var tank = new Tank();

      var resolver = new CollisionResolverMock();
      tank.simulationStep(resolver);
      assert(!tank.state.radar.enemy);
      var enemy = new TankMock();
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
      var tank = new Tank();
      var maxEnergy = tank.maxEnergy;
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
      var tank = new Tank();
      tank.moveTo(345, 567);
      assert.equal(345, tank.x);
      assert.equal(567, tank.y);

      tank.moveTo(0.123, 0.432);
      assert.equal(0.123, tank.x);
      assert.equal(0.432, tank.y);
    });

    it('should not affect tank speed', function() {
      var tank = new Tank();
      assert.equal(0, tank.speed);
      tank.moveTo(345, 567);
      assert.equal(0, tank.speed);
      var resolver = new CollisionResolverMock();
      tank.simulationStep(resolver);
      assert.equal(0, tank.speed);
    });

  });

  describe('handleShoot', function() {

    it('should return power of shoot', function() {
      var tank = new Tank();
      tank.shoot(0.3);
      assert.equal(0.3, tank.handleShoot());
      tank = new Tank();
      tank.shoot(1);
      assert.equal(1, tank.handleShoot());
    });

    it('should return power of shot only once', function() {
      var tank = new Tank();
      tank.shoot(0.7);
      assert.equal(0.7, tank.handleShoot());
      assert.equal(0, tank.handleShoot());
    });

  });

  describe('shoot', function() {

    it('should be blocked when reloading', function() {
      var tank = new Tank();
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
      var tank = new Tank();
      var pos1 = tank.angle;
      tank.randomize();
      var pos2 = tank.angle;
      tank.randomize();
      var pos3 = tank.angle;

      var diff1 = pos1 != pos2;
      var diff2 = pos2 != pos3;
      var diff3 = pos3 != pos1;

      assert(diff1 || diff2 || diff3);
    });

  });

  describe('simulationStep', function() {

    it('should move the tank', function() {
      var tank = new Tank();
      var oldPos = tank.x + ":" + tank.y;
      tank.setThrottle(1);
      var resolver = new CollisionResolverMock();
      for(var i=0; i< 5; i++) {
        tank.simulationStep(resolver);
      }
      var newPos = tank.x + ":" + tank.y;

      assert.notEqual(oldPos, newPos);
    });

    it('should rotate the tank', function() {
      var tank = new Tank();
      var oldPos = tank.angle;
      tank.setTurn(1);
      var resolver = new CollisionResolverMock();
      for(var i=0; i< 5; i++) {
        tank.simulationStep(resolver);
      }
      var newPos = tank.angle;

      assert.notEqual(oldPos, newPos);
    });

    it('should rotate the gun', function() {
      var tank = new Tank();
      var oldPos = tank.gunAngle;
      tank.setGunTurn(1);
      var resolver = new CollisionResolverMock();
      for(var i=0; i< 5; i++) {
        tank.simulationStep(resolver);
      }
      var newPos = tank.gunAngle;

      assert.notEqual(oldPos, newPos);
    });

    it('should rotate the radar', function() {
      var tank = new Tank();
      var oldPos = tank.radarAngle;
      tank.setRadarTurn(1);
      var resolver = new CollisionResolverMock();
      for(var i=0; i< 5; i++) {
        tank.simulationStep(resolver);
      }
      var newPos = tank.radarAngle;

      assert.notEqual(oldPos, newPos);
    });

    it('should not move the tank if collide', function() {
      var tank = new Tank();
      tank.moveTo(34, 56);
      var oldPos = tank.x + ":" + tank.y;
      tank.setThrottle(1);
      var resolver = new CollisionResolverMock();
      resolver.checkTank.returns(false);
      for(var i=0; i< 5; i++) {
        tank.simulationStep(resolver);
      }
      var newPos = tank.x + ":" + tank.y;

      assert.equal(oldPos, newPos);
    });

    it('should update tank state', function() {
      var tank = new Tank();
      tank.moveTo(34, 56);
      var resolver = new CollisionResolverMock();
      tank.simulationStep(resolver);
      var oldPos = tank.state.x + ":" + tank.state.y;
      tank.setThrottle(1);
      for(var i=0; i< 5; i++) {
        tank.simulationStep(resolver);
      }
      var newPos = tank.state.x + ":" + tank.state.y;

      assert.notEqual(oldPos, newPos);
    });

  });




});
