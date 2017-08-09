var assert = require('assert');
var sinon = require('sinon');
var AiWrapper = require('../../app/engine/AiWrapper.js');
var WorkerMock = require('./mock/WorkerMock.js');
var TankMock = require('./mock/TankMock.js');

describe('AiWrapper', function() {
  describe('constructor', function() {

    it('should store tank reference', function () {
      var tank = new TankMock();
      var ai = new AiWrapper(tank);

      assert.equal(tank, ai.tank);
    });

  });

  describe('activate', function() {

    it('should create web worker', function (done) {
      var tank = new TankMock();
      var ai = new AiWrapper(tank);
      var worker;
      ai._createWorker = function(name) {
        worker = new WorkerMock(name);
        return worker;
      }
      var promise = ai.activate();
      worker.onmessage({
        data: {
          type: 'init'
        }
      });
      promise.then(function() {
        assert(worker.postMessage.calledOnce);
        assert.notEqual(-1, worker.name.search(tank.name));
        done();
      })
      .catch(function(err) {
        assert.fail("Error" + err.message);
      });
    });

    it('should return error if worker not responding', function (done) {
      this.timeout(5000);
      var tank = new TankMock();
      var ai = new AiWrapper(tank);
      var worker;
      ai._createWorker = function(name) {
        worker = new WorkerMock(name);
        return worker;
      }
      ai.setProcessingLimit(100);
      var promise = ai.activate();
      promise.then(function() {
        assert.fail("Should return error");
        done();
      })
      .catch(function(err) {
        assert.equal(true, err.performanceIssues);
        assert.equal(tank.name, err.tankName);
        assert.equal(tank.id, err.tankId);
        done();
      });
    });

    it('should pass code to worker', function (done) {
      var tank = new TankMock();
      var ai = new AiWrapper(tank, {code: "My AI code"});
      var worker;
      ai._createWorker = function(name) {
        worker = new WorkerMock(name);
        worker.postMessage = (data) => {
          assert.equal("My AI code", data.code);
        }
        return worker;
      }
      var promise = ai.activate();
      worker.onmessage({
        data: {
          type: 'init'
        }
      });
      promise.then(function() {

        done();
      })
      .catch(function(err) {
        assert.fail("Error" + err.message);
      });
    });

  });

  describe('deactivate', function() {

    it('should terminate web worker', function(done) {
      var tank = new TankMock();
      var ai = new AiWrapper(tank);
      var worker;
      ai._createWorker = function(name) {
        worker = new WorkerMock(name);
        return worker;
      }
      var promise = ai.activate();
      worker.onmessage({
        data: {
          type: 'init'
        }
      });
      promise.then(function() {
        ai.deactivate();
        assert(worker.terminate.calledOnce)
        done();
      })
      .catch(function(err) {
        assert.fail("Error" + err.message);
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
      var ai = new AiWrapper(tank);
      var worker;
      ai._createWorker = function(name) {
        worker = new WorkerMock(name);
        return worker;
      }
      var promise = ai.activate();
      worker.onmessage({
        data: {
          type: 'init'
        }
      });
      promise = promise.then(function(  ) {
        var p = ai.simulationStep();
        worker.onmessage({
          data: control
        });
        return p;
      })
      .then(function() {
        assert(worker.postMessage.calledTwice)
        assert(tank.setThrottle.calledWith(control.THROTTLE));
        assert(tank.setTurn.calledWith(control.TURN));
        assert(tank.setRadarTurn.calledWith(control.RADAR_TURN));
        assert(tank.setGunTurn.calledWith(control.GUN_TURN));
        assert(tank.shoot.calledWith(control.SHOOT));
        assert(tank.setBoost.calledWith(control.BOOST));
        assert(tank.setDebugData.calledWith(control.DEBUG));
        done();
      })
      .catch(function(err) {
        assert.fail("Error" + err.message);
      });
    });

    it('return error if working not responding', function (done) {
      this.timeout(5000);
      var tank = new TankMock();
      var ai = new AiWrapper(tank);
      var worker;
      ai._createWorker = function(name) {
        worker = new WorkerMock(name);
        return worker;
      }
      ai.setProcessingLimit(100);
      var promise = ai.activate();
      worker.onmessage({
        data: {
          type: 'init'
        }
      });
      promise.then(function(  ) {
        return ai.simulationStep();
      })
      .then(function() {
        assert.fail("Should return error");
      })
      .catch(function(err) {
        done();
      });
    });

  });
});
