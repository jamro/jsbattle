var assert = require('assert');
var sinon = require('sinon');

var Simulation = require('../app/scripts/Simulation.js');
var RendererMock = require('./mock/RendererMock.js');
var BattlefieldMock = require('./mock/BattlefieldMock.js');
var TankMock = require('./mock/TankMock.js');
var BulletMock = require('./mock/BulletMock.js');
var AiWrapperMock = require('./mock/AiWrapperMock.js');


function createSimulation() {
  var renderer = new RendererMock();
  var sim = new Simulation(renderer);
  sim._createAiWrapper = function(tank) {
    return new AiWrapperMock(tank);
  }
  sim._createTank = function(name) {
    return new TankMock();
  }
  sim._createBullet = function(owner, power) {
    return new BulletMock(owner, power);
  }
  return sim;
}

describe('Simulation', function() {
  describe('construct', function() {

    it('should set the renderer', function() {
      var renderer = new RendererMock();
      var sim = new Simulation(renderer);

      assert.equal(renderer, sim.renderer);
    });
  });

  describe('init', function() {

    it('should set size of the battlefield', function() {
      var renderer = new RendererMock();
      var sim = new Simulation(renderer);
      sim.init(340, 560);
      assert.equal(340-sim.battlefield.margin*2, sim.battlefield.width);
      assert.equal(560-sim.battlefield.margin*2, sim.battlefield.height);
    });

    it('should init renderer\'s battlefield', function() {
      var renderer = new RendererMock();
      var sim = new Simulation(renderer);
      sim.init(340, 560);
      assert(renderer.initBatlefield.calledWith(sim.battlefield));
    });

  });

  describe('setSpeed', function() {

    it('should change simulation speed', function (done) {
      var sim1 = createSimulation();
      var sim2 = createSimulation();
      sim1.init(600, 600);
      sim2.init(600, 600);

      sim1.addTank('bravo');
      sim1.addTank('bravo');
      sim2.addTank('bravo');
      sim2.addTank('bravo');

      var stepCount1 = 0;
      sim1.onStep(function () {
        stepCount1++;
      });
      var stepCount2 = 0;
      sim2.onStep(function () {
        stepCount2++;
      });
      sim2.setSpeed(2);
      sim1.start();
      sim2.start();

      setTimeout(function() {
        var multiplier = Math.round(stepCount2/stepCount1);
        sim1.stop();
        sim2.stop();
        assert.equal(2, multiplier);
        done();
      }, 200);
    });

  });

  describe('start', function() {

    it('should start rendering loop', function (done) {
      var sim = createSimulation();
      sim.init(600, 600);
      sim.addTank('bravo');
      sim.addTank('bravo');

      sim.onRender(function () {
        sim.stop();
        done();
      });
      sim.start();
    });

    it('should start simulation loop', function (done) {
      var sim = createSimulation();
      sim.init(600, 600);
      sim.addTank('bravo');
      sim.addTank('bravo');

      sim.onStep(function () {
        sim.stop();
        done();
      });
      sim.start();
    });

    it('should remove destroyed tanks', function (done) {
      var sim = createSimulation();
      sim.init(600, 600);

      var tank1 = sim.addTank('bravo').tank;
      var tank2 = sim.addTank('bravo').tank;
      var tank3 = sim.addTank('bravo').tank;
      tank1.energy = 0;

      var totalStepCount = 0;

      sim.onStep(function () {
        totalStepCount++;
        if(totalStepCount > 5) {
          assert(tank1.simulationStep.notCalled <= 1); // may be called once
          assert.equal(totalStepCount, tank2.simulationStep.callCount);
          assert.equal(totalStepCount, tank3.simulationStep.callCount);
          sim.stop();
          done();
        }
      });
      sim.start();
    });

    it('should stop when no enemys left', function (done) {
      var sim = createSimulation();
      sim.init(600, 600);

      var tank1 = sim.addTank('bravo').tank;
      sim.addTank('bravo').tank;
      tank1.energy = 0;

      var totalStepCount = 0;
      sim.onFinish(function() {
        done();
      });
      sim.onStep(function () {
        totalStepCount++;
        if(totalStepCount > 10) {
          assert.fail("Simulation did not stopped");
          sim.stop();
        }
      });
      sim.start();
    });

    it('should award survival scores', function (done) {
      var sim = createSimulation();
      sim.init(600, 600);

      var tank1 = sim.addTank('bravo').tank;
      var tank2 = sim.addTank('bravo').tank;
      var tank3 = sim.addTank('bravo').tank;
      tank1.energy = 0;

      var totalStepCount = 0;

      sim.onStep(function () {
        assert(tank1.onSurviveScore.notCalled);
        assert(tank2.onSurviveScore.called);
        assert(tank3.onSurviveScore.called);
        sim.stop();
        done();
      });
      sim.start();
    });

    it('should update tanks', function (done) {
      var sim = createSimulation();
      sim.init(600, 600);

      var tank1 = sim.addTank('bravo').tank;
      var tank2 = sim.addTank('bravo').tank;

      var totalStepCount = 0;

      sim.onStep(function () {
        assert(tank1.simulationStep.called);
        assert(tank2.simulationStep.called);
        sim.stop();
        done();
      });
      sim.start();
    });

    it('should activate AI', function (done) {
      var sim = createSimulation();
      sim.init(600, 600);
      var ai = new AiWrapperMock(new TankMock());
      sim._createAiWrapper = function(tank) {
        return ai;
      }
      sim.addTank('bravo');
      sim.addTank('bravo');
      sim.start();

      setTimeout(function () {
        assert(ai.activate.called);
        sim.stop();
        done();
      }, 30);
    });
  });

  describe('stop', function() {

    it('should stop simulation', function (done) {
      var sim = createSimulation();
      sim.init(600, 600);

      sim.addTank('bravo');
      sim.addTank('bravo');

      var stepCount = 0;
      var finalStepCount = 0;
      sim.onStep(function () {
        stepCount++;
      });
      sim.start();
      setTimeout(function() {
        sim.stop();
        finalStepCount = stepCount;
        setTimeout(function() {
          assert.equal(finalStepCount, stepCount);
          done();
        }, 50);
      }, 50);
    });
  });

  describe('addTank', function() {

    it('should add Tank to simulation', function() {
      var sim = createSimulation();
      sim.init(600, 600);

      assert.equal(0, sim.tankList.length);
      sim.addTank("bravo");
      assert.equal(1, sim.tankList.length);
      sim.addTank("bravo");
      assert.equal(2, sim.tankList.length);
      sim.addTank("bravo");
      assert.equal(3, sim.tankList.length);
    });

  });

  describe('timeLimit', function() {

    it('should limit duration of the simulation', function(done) {
      var sim = createSimulation();
      sim.init(600, 600);

      var tank1 = sim.addTank('bravo').tank;
      var tank2 = sim.addTank('bravo').tank;

      sim.timeLimit = 50;

      sim.onFinish(function() {
        assert(sim.timeElapsed == sim.timeLimit)
        done();
      });

      sim.start();
    });
  });
});
