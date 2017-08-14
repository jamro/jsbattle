var assert = require('assert');
var sinon = require('sinon');
var AiWrapper = require('../../app/engine/AiWrapper.js');
var WorkerMock = require('./mock/WorkerMock.js');
var TankMock = require('./mock/TankMock.js');
var AiDefinitionMock = require('./mock/AiDefinitionMock.js');

describe('AiWrapper', function() {
  describe('constructor', function() {

    it('should store tank reference', function () {
      var tank = new TankMock();
      var ai = new AiWrapper(tank, new AiDefinitionMock());

      assert.equal(tank, ai.tank);
    });

  });

  describe('activate', function() {

    it('should create web worker', function (done) {
      var tank = new TankMock();
      var ai = new AiWrapper(tank, new AiDefinitionMock());
      var worker;
      ai._createWorker = function(name) {
        worker = new WorkerMock(name);
        return worker;
      }
      ai.activate(1,
        () => {
          assert(worker.postMessage.calledOnce);
          done();
        },
        (err) => {
          assert.fail("Error " + err);
        }
      );
      worker.onmessage({
        data: {
          type: 'init'
        }
      });
    });

    it('should return error if worker not responding', function (done) {
      this.timeout(5000);
      var tank = new TankMock();
      var ai = new AiWrapper(tank, new AiDefinitionMock());
      var worker;
      ai._createWorker = function(name) {
        worker = new WorkerMock(name);
        return worker;
      }
      ai.setProcessingLimit(100);
      ai.activate(1,
        () => {
          assert.fail("Should return error");
          done();
        },
        (err) => {
          assert.equal(true, err.performanceIssues);
          assert.equal(tank.name, err.tankName);
          assert.equal(tank.id, err.tankId);
          done();
        }
      );
    });

    it('should pass code to worker', function (done) {
      var tank = new TankMock();
      var def = new AiDefinitionMock();
      def.code = "My AI code";
      var ai = new AiWrapper(tank, def);
      var worker;
      ai._createWorker = function(name) {
        worker = new WorkerMock(name);
        worker.postMessage = (data) => {
          assert.equal("My AI code", data.code);
        }
        return worker;
      }
      ai.activate(1,
        () => {
          done();
        },
        (err) => {
          assert.fail("Error" + err.message);
          done();
        }
      );
      worker.onmessage({
        data: {
          type: 'init'
        }
      });
    });

  });

  describe('deactivate', function() {

    it('should terminate web worker', function(done) {
      var tank = new TankMock();
      var ai = new AiWrapper(tank, new AiDefinitionMock());
      var worker;
      ai._createWorker = function(name) {
        worker = new WorkerMock(name);
        return worker;
      }
      ai.activate(1,
        () => {
          ai.deactivate();
          assert(worker.terminate.calledOnce)
          done();
        },
        (err) => {
          assert.fail("Error" + err.message);
          done();
        }
      );
      worker.onmessage({
        data: {
          type: 'init'
        }
      });
    });

  });


  describe('simulationStep', function() {
    it('should call worker', function (done) {
      var tank = new TankMock();
      var control = {
        THROTTLE: Math.random(),
        TURN: Math.random(),
        RADAR_TURN: Math.random(),
        GUN_TURN: Math.random(),
        BOOST: Math.random() ? 1 : 0,
        SHOOT: 0.5 + 0.5*Math.random(),
        DEBUG: {}
      }
      var ai = new AiWrapper(tank, new AiDefinitionMock());
      var worker;
      ai._createWorker = function(name) {
        worker = new WorkerMock(name);
        return worker;
      }
      ai.activate(1,
        () => {
          ai.simulationStep(() => {
            assert(worker.postMessage.calledTwice)
            assert(tank.setThrottle.calledWith(control.THROTTLE));
            assert(tank.setTurn.calledWith(control.TURN));
            assert(tank.setRadarTurn.calledWith(control.RADAR_TURN));
            assert(tank.setGunTurn.calledWith(control.GUN_TURN));
            assert(tank.shoot.calledWith(control.SHOOT));
            assert(tank.setBoost.calledWith(control.BOOST));
            assert(tank.setDebugData.calledWith(control.DEBUG));
            done();
          }, (err) => {
            assert.fail("Error" + err.message);
            done();
          });
          worker.onmessage({
            data: control
          });
        },
        (err) => {
          assert.fail("Error" + err.message);
          done();
        }
      );
      worker.onmessage({
        data: {
          type: 'init'
        }
      });

    });

    it('should return error if working not responding', function (done) {
      this.timeout(5000);
      var tank = new TankMock();
      var ai = new AiWrapper(tank, new AiDefinitionMock());
      var worker;
      ai._createWorker = function(name) {
        worker = new WorkerMock(name);
        return worker;
      }
      ai.setProcessingLimit(100);
      ai.activate(1,
        () => {
          worker.onmessage({
            data: {
              type: 'init'
            }
          });
          ai.simulationStep(() => {
            assert.fail("Should return error");
            done();
          }, (err) => {
            done();
          });
        },
        (err) => {
          done();
        }
      );

    });

  });
});
