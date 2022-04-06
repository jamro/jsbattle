import assert from "assert";
import sinon from "sinon";

import Simulation from "../../src/engine/Simulation.js"
import RendererMock from "./mock/RendererMock.js";
import BattlefieldMock from "./mock/BattlefieldMock.js";
import TankMock from "./mock/TankMock.js";
import BulletMock from "./mock/BulletMock.js";
import AiWrapperMock from "./mock/AiWrapperMock.js";
import PerformanceMonitorMock from "./mock/PerformanceMonitorMock.js";
import AiDefinitionMock from "./mock/AiDefinitionMock.js";

function createSimulation() {
  let renderer = new RendererMock();
  let sim = new Simulation(renderer);
  sim._perfMon = new PerformanceMonitorMock();
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
      let renderer = new RendererMock();
      let sim = new Simulation(renderer);

      assert.equal(renderer, sim.renderer);
    });
  });

  describe('init', function() {

    it('should set size of the battlefield', function() {
      let renderer = new RendererMock();
      let sim = new Simulation(renderer);
      sim.init(340, 560);
      assert.equal(340-sim.battlefield.margin*2, sim.battlefield.width);
      assert.equal(560-sim.battlefield.margin*2, sim.battlefield.height);
    });

    it('should init renderer\'s battlefield', function() {
      let renderer = new RendererMock();
      let sim = new Simulation(renderer);
      sim.init(340, 560);
      assert(renderer.initBatlefield.calledWith(sim.battlefield));
    });

  });

  describe('setSpeed', function() {

    it('should change renderer speed', function () {
      let renderer = new RendererMock();
      let sim = new Simulation(renderer);
      sim.init(600, 600);
      sim.setSpeed(3.2);
      assert(renderer.setSpeed.calledWith(3.2));
    });

    it('should change simulation speed', function (done) {
      this.retries(3);
      let sim1 = createSimulation();
      let sim2 = createSimulation();
      sim1.init(600, 600);
      sim2.init(600, 600);

      sim1.addTank(new AiDefinitionMock());
      sim1.addTank(new AiDefinitionMock());
      sim2.addTank(new AiDefinitionMock());
      sim2.addTank(new AiDefinitionMock());

      let stepCount1 = 0;
      sim1.onStep(function () {
        stepCount1++;
      });
      let stepCount2 = 0;
      sim2.onStep(function () {
        stepCount2++;
      });
      sim1.setSpeed(0.2);
      sim2.setSpeed(0.4);
      sim1.start();
      sim2.start();

      setTimeout(function() {
        assert(stepCount1 > 1, "Simulation1 steps were counted multiple times");
        assert(stepCount2 > 1, "Simulation2 steps were counted multiple times");
        sim1.stop();
        sim2.stop();
        assert(
          stepCount2 > stepCount1*1.2 && stepCount2 < stepCount1*2.8,
          "stepCount1 (x1): " + stepCount1 + ", stepCount2 (x2): " + stepCount2
        );
        done();
      }, 1500);
    });

  });

  describe('start', function() {

    it('should start rendering loop', function (done) {
      let sim = createSimulation();
      sim.init(600, 600);
      sim.addTank(new AiDefinitionMock());
      sim.addTank(new AiDefinitionMock());

      sim.onRender(function () {
        sim.stop();
        done();
      });
      sim.start();
    });

    it('should start simulation loop', function (done) {
      let sim = createSimulation();
      sim.init(600, 600);
      sim.addTank(new AiDefinitionMock());
      sim.addTank(new AiDefinitionMock());

      sim.onStep(function () {
        sim.stop();
        done();
      });
      sim.start();
    });

    it('should remove destroyed tanks', function (done) {
      let sim = createSimulation();
      sim.init(600, 600);

      let tank1 = sim.addTank(new AiDefinitionMock()).tank;
      let tank2 = sim.addTank(new AiDefinitionMock()).tank;
      let tank3 = sim.addTank(new AiDefinitionMock()).tank;
      tank1.energy = 0;

      let totalStepCount = 0;

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
      let sim = createSimulation();
      sim.init(600, 600);

      let tank1 = sim.addTank(new AiDefinitionMock()).tank;
      sim.addTank(new AiDefinitionMock()).tank;
      tank1.energy = 0;

      let totalStepCount = 0;
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
      let sim = createSimulation();
      sim.init(600, 600);

      let tank1 = sim.addTank(new AiDefinitionMock()).tank;
      let tank2 = sim.addTank(new AiDefinitionMock()).tank;
      let tank3 = sim.addTank(new AiDefinitionMock()).tank;
      tank1.energy = 0;

      let totalStepCount = 0;

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
      let sim = createSimulation();
      sim.init(600, 600);

      let tank1 = sim.addTank(new AiDefinitionMock()).tank;
      let tank2 = sim.addTank(new AiDefinitionMock()).tank;

      let totalStepCount = 0;

      sim.onStep(function () {
        assert(tank1.simulationStep.called);
        assert(tank2.simulationStep.called);
        sim.stop();
        done();
      });
      sim.start();
    });

    it('should activate AI', function (done) {
      let sim = createSimulation();
      sim.init(600, 600);
      let ai = new AiWrapperMock(new TankMock());
      sim._createAiWrapper = function(tank) {
        return ai;
      }
      sim.addTank(new AiDefinitionMock());
      sim.addTank(new AiDefinitionMock());
      sim.start();

      setTimeout(function () {
        assert(ai.activateCallCount > 0);
        sim.stop();
        done();
      }, 30);
    });

    it('should start Perfomance Monitor', function(done) {
      let sim = createSimulation();
      sim.init(600, 600);

      let tank1 = sim.addTank(new AiDefinitionMock()).tank;
      let tank2 = sim.addTank(new AiDefinitionMock()).tank;

      sim.onStep(function () {
        assert(sim._perfMon.start.calledOnce);
        sim.stop();
        done();
      });
      sim.start();
    });
  });

  describe('stop', function() {

    it('should stop simulation', function (done) {
      let sim = createSimulation();
      sim.init(600, 600);

      sim.addTank(new AiDefinitionMock());
      sim.addTank(new AiDefinitionMock());

      let stepCount = 0;
      let finalStepCount = 0;
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

    it('should stop renderer', function (done) {
      let renderer = new RendererMock();
      let sim = new Simulation(renderer);
      sim._createAiWrapper = function(tank) {
        return new AiWrapperMock(tank);
      }
      sim._createTank = function(name) {
        return new TankMock();
      }
      sim._createBullet = function(owner, power) {
        return new BulletMock(owner, power);
      }
      sim.init(600, 600);

      sim.addTank(new AiDefinitionMock());
      sim.addTank(new AiDefinitionMock());

      sim.start();
      setTimeout(function() {
        sim.stop();
        setTimeout(function() {
          assert(renderer.stop.called);
          done();
        }, 50);
      }, 50);
    });

    it('should stop Perfomance Monitor', function(done) {
      let sim = createSimulation();
      sim.init(600, 600);
      sim.addTank(new AiDefinitionMock());
      sim.addTank(new AiDefinitionMock());

      sim.start();
      setTimeout(function() {
        sim.stop();
        setTimeout(function() {
          assert(sim._perfMon.stop.calledOnce)
          done();
        }, 50);
      }, 50);
    });

  });

  describe('addTank', function() {

    it('should add Tank to simulation', function() {
      let sim = createSimulation();
      sim.init(600, 600);

      assert.equal(0, sim.tankList.length);
      sim.addTank(new AiDefinitionMock());
      assert.equal(1, sim.tankList.length);
      sim.addTank(new AiDefinitionMock());
      assert.equal(2, sim.tankList.length);
      sim.addTank(new AiDefinitionMock());
      assert.equal(3, sim.tankList.length);
    });


    it('should add Tank to a team', function() {
      let sim = createSimulation();
      sim.init(600, 600);

      const ai1 = new AiDefinitionMock();
      const ai2 = new AiDefinitionMock();
      const ai3 = new AiDefinitionMock();
      const ai4 = new AiDefinitionMock();

      ai1.teamName = 'team-1';
      ai2.teamName = 'team-1';
      ai3.teamName = 'team-2';
      ai4.teamName = 'team-2';

      sim.addTank(ai1);
      sim.addTank(ai2);
      sim.addTank(ai3);
      sim.addTank(ai4);

      assert.equal(sim.teamList.length, 2);
      assert.equal(sim.teamList[0].name, 'team-1');
      assert.equal(sim.teamList[0].index, 1);
      assert.equal(sim.teamList[1].name, 'team-2');
      assert.equal(sim.teamList[1].index, 2);

    });

  });

  describe('timeLimit', function() {

    it('should limit duration of the simulation', function(done) {
      let sim = createSimulation();
      sim.init(600, 600);

      let tank1 = sim.addTank(new AiDefinitionMock()).tank;
      let tank2 = sim.addTank(new AiDefinitionMock()).tank;

      sim.timeLimit = 50;

      sim.onFinish(function() {
        assert(sim.timeElapsed == sim.timeLimit)
        done();
      });

      sim.start();
    });
  });

  describe('simulationStep', function() {

    it('should update Performance Monitor', function(done) {
      let sim = createSimulation();
      sim.init(600, 600);
      sim.addTank(new AiDefinitionMock());
      sim.addTank(new AiDefinitionMock());

      sim.onStep(function () {
        assert(sim._perfMon.onSimulationStep.calledOnce)
        sim.stop();
        done();
      });
      sim.start();
    });

  });

  describe('setRendererQuality', function() {

    it('should change quality of renderer', function(done) {
      let renderer = new RendererMock();
      let sim = new Simulation(renderer);
      sim._createAiWrapper = function(tank) {
        return new AiWrapperMock(tank);
      }
      sim._createTank = function(name) {
        return new TankMock();
      }
      sim._createBullet = function(owner, power) {
        return new BulletMock(owner, power);
      }
      sim.init(600, 600);

      sim.addTank(new AiDefinitionMock());
      sim.addTank(new AiDefinitionMock());

      sim.start();
      sim.setRendererQuality(0.32);

      sim.onRender(function () {
        sim.stop();
        assert.equal(0.32, renderer.quality);
        done();
      });
    });

    it('should support auto mode', function(done) {
      let renderer = new RendererMock();
      let sim = new Simulation(renderer);
      sim._createAiWrapper = function(tank) {
        return new AiWrapperMock(tank);
      }
      sim._createTank = function(name) {
        return new TankMock();
      }
      sim._createBullet = function(owner, power) {
        return new BulletMock(owner, power);
      }
      sim.init(600, 600);

      sim.addTank(new AiDefinitionMock());
      sim.addTank(new AiDefinitionMock());

      sim.start();
      sim.setRendererQuality('auto');
      sim._perfMon._quality = 0.43;

      sim.onRender(function () {
        sim.stop();
        assert.equal(0.43, renderer.quality);
        done();
      });
    });

  });

  describe('seeded RNG', function() {
    it('should return different data when not seeded', function() {
      let renderer = new RendererMock();
      let sim1 = new Simulation(renderer);
      let sim2 = new Simulation(renderer);
      let r1 = sim1.getRandom();
      let r2 = sim2.getRandom();
      assert.notEqual(r1, r2);
    });

    it('should return the same data when seeded', function() {
      let renderer = new RendererMock();
      let sim1 = new Simulation(renderer);
      let sim2 = new Simulation(renderer);
      sim1.setRngSeed(12345);
      sim2.setRngSeed(12345);
      let r1 = sim1.getRandom();
      let r2 = sim2.getRandom();
      assert.equal(r1, r2);
    });


    it('should return different data when seeded differently', function() {
      let renderer = new RendererMock();
      let sim1 = new Simulation(renderer);
      let sim2 = new Simulation(renderer);
      sim1.setRngSeed(12345);
      sim2.setRngSeed(54321);
      let r1 = sim1.getRandom();
      let r2 = sim2.getRandom();
      assert.notEqual(r1, r2);
    });
  });


  describe('hasTeams', function() {

    it('should return true when there are multiple tanks in one team', function() {
      let sim = createSimulation();
      sim.init(600, 600);
      let ai1 = new AiDefinitionMock();
      let ai2 = new AiDefinitionMock();
      let ai3 = new AiDefinitionMock();
      let ai4 = new AiDefinitionMock();

      ai1.teamName = "team A";
      ai2.teamName = "team A";
      ai3.teamName = "team B";
      ai4.teamName = "team C";

      sim.addTank(ai1);
      sim.addTank(ai2);
      sim.addTank(ai3);
      sim.addTank(ai4);

      assert.equal(true, sim.hasTeams());
    });

    it('should return false when there are no team', function() {
      let sim = createSimulation();
      sim.init(600, 600);
      let ai1 = new AiDefinitionMock();
      let ai2 = new AiDefinitionMock();
      let ai3 = new AiDefinitionMock();
      let ai4 = new AiDefinitionMock();

      ai1.teamName = "team A";
      ai2.teamName = "team B";
      ai3.teamName = "team C";
      ai4.teamName = "team D";

      sim.addTank(ai1);
      sim.addTank(ai2);
      sim.addTank(ai3);
      sim.addTank(ai4);

      assert.equal(false, sim.hasTeams());
    });

    it('should return false when there are no tank', function() {
      let sim = createSimulation();
      sim.init(600, 600);

      assert.equal(false, sim.hasTeams());
    });

  });


  describe('createUltimateBattleDescriptor', function() {

    it('should throw error when custom finish condition is used', function() {
      let sim = createSimulation();
      sim.setFinishCondition(() => false);
      sim.init(600, 600);
      sim.addTank(new AiDefinitionMock());
      sim.addTank(new AiDefinitionMock());
      sim.addTank(new AiDefinitionMock());
      sim.addTank(new AiDefinitionMock());

      assert.throws(() => sim.createUltimateBattleDescriptor());
    });

    it('should return UBD with list of AIs', function() {
      let sim = createSimulation();
      sim.init(600, 600);
      sim.addTank(new AiDefinitionMock());
      sim.addTank(new AiDefinitionMock());
      sim.addTank(new AiDefinitionMock());
      sim.addTank(new AiDefinitionMock());

      let ubd = sim.createUltimateBattleDescriptor();

      assert.equal(4, ubd.getAiList().length);

    });
    it('should return UBD with proper RNG seed', function() {
      let sim = createSimulation();
      sim.init(600, 600);
      sim.setRngSeed(994);

      let ubd = sim.createUltimateBattleDescriptor();

      assert.equal(994, ubd.getRngSeed());
    });

    it('should return UBD with team mode', function() {
      let sim = createSimulation();
      sim.init(600, 600);
      let ai1 = new AiDefinitionMock();
      let ai2 = new AiDefinitionMock();
      let ai3 = new AiDefinitionMock();
      let ai4 = new AiDefinitionMock();

      ai1.teamName = "team A";
      ai2.teamName = "team A";
      ai3.teamName = "team B";
      ai4.teamName = "team C";

      sim.addTank(ai1);
      sim.addTank(ai2);
      sim.addTank(ai3);
      sim.addTank(ai4);

      let ubd = sim.createUltimateBattleDescriptor();

      assert.equal(true, ubd.getTeamMode());
    });


    it('should return UBD without team mode', function() {
      let sim = createSimulation();
      sim.init(600, 600);
      let ai1 = new AiDefinitionMock();
      let ai2 = new AiDefinitionMock();
      let ai3 = new AiDefinitionMock();
      let ai4 = new AiDefinitionMock();

      ai1.teamName = "team A";
      ai2.teamName = "team B";
      ai3.teamName = "team C";
      ai4.teamName = "team D";

      sim.addTank(ai1);
      sim.addTank(ai2);
      sim.addTank(ai3);
      sim.addTank(ai4);

      let ubd = sim.createUltimateBattleDescriptor();

      assert.equal(false, ubd.getTeamMode());
    });

    it('should return new object each time', function() {
      let sim = createSimulation();
      sim.init(600, 600);

      sim.setRngSeed(123);
      let ubd1 = sim.createUltimateBattleDescriptor();
      ubd1.setRngSeed(456);
      let ubd2 = sim.createUltimateBattleDescriptor();

      assert.equal(123, ubd2.getRngSeed());
    });
  });



});
