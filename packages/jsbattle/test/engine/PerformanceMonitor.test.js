import assert from "assert";
import sinon from "sinon";

import PerformanceMonitor from "../../src/engine/PerformanceMonitor.js"

describe('PerformanceMonitor', function() {

  describe('constructor', function() {

    it('should set max quality', function() {
      let mon = new PerformanceMonitor();
      assert.equal(1, mon.qualityLevel);
    });

    it('should not start it', function() {
      let mon = new PerformanceMonitor();
      assert(!mon.started);
    });

  });

  describe('start', function() {

    it('should start it', function() {
      let mon = new PerformanceMonitor();
      mon.start();
      assert(mon.started);
      mon.stop();
    });

    it('should run check loop', function(done) {
      let mon = new PerformanceMonitor();
      mon._checkInterval = 10;
      mon.start();
      let defPerfomance = mon.actualPerfomance;
      let loop = setInterval(() => {
        mon.onSimulationStep();
      }, 1);

      setTimeout(() => {
        assert(mon.actualPerfomance > defPerfomance)
        mon.stop();
        clearInterval(loop);
        done();
      }, 20);
    });

  });


  describe('start', function() {

    it('should stop it', function() {
      let mon = new PerformanceMonitor();
      mon.start();
      mon.stop();
      assert(!mon.started);
    });

    it('should stop check loop', function(done) {
      let mon = new PerformanceMonitor();
      mon._checkInterval = 10;
      mon.start();
      let stopPerformance;
      let loop = setInterval(() => {
        mon.onSimulationStep();
      }, 1);

      setTimeout(() => {
        stopPerformance = mon.actualPerfomance;
        mon.stop();
        clearInterval(loop);
        setTimeout(() => {
          assert(stopPerformance == mon.actualPerfomance)
          done();
        }, 20);
      }, 20)
    });

  });


  describe('setSimulationStepDuration', function() {

    it('should set desired performance', function() {
      let mon = new PerformanceMonitor();
      mon.setSimulationStepDuration(20);

      assert(1000/20, mon.desiredPerfomance);
    });

  });

  describe('checkLoop', function() {

    it('should adjust quality to performance', function(done) {
      let mon = new PerformanceMonitor();
      assert.equal(1, mon.qualityLevel)
      mon._checkInterval = 1;
      mon.start();

      setTimeout(() => {
        assert(mon.qualityLevel < 1, "quality level is " + mon.qualityLevel);
        let lowPerformance = mon.qualityLevel;
        let loop = setInterval(() => {
          mon.onSimulationStep();
          mon.onSimulationStep();
          mon.onSimulationStep();
          mon.onSimulationStep();
          mon.onSimulationStep();
          mon.onSimulationStep();
          mon.onSimulationStep();
        }, 1);
        setTimeout(() => {
          
          clearInterval(loop);
          mon.stop();
          assert(mon.qualityLevel > lowPerformance, "quality level is " + mon.qualityLevel + " but should be above " + lowPerformance);
          done();
        }, 20);
      }, 20);
    });

    it('should not redeuce quality below 0', function(done) {
      let mon = new PerformanceMonitor();
      assert.equal(1, mon.qualityLevel)
      mon._checkInterval = 1;
      mon.start();

      setTimeout(() => {
        mon.stop();
        assert(mon.qualityLevel == 0);
        done();
      }, 30);
    });

    it('should not increase quality above 1', function(done) {
      let mon = new PerformanceMonitor();
      assert.equal(1, mon.qualityLevel)
      mon._checkInterval = 10;
      mon.start();

      let loop = setInterval(() => {
        mon.onSimulationStep();
        mon.onSimulationStep();
        mon.onSimulationStep();
        mon.onSimulationStep();
      }, 1);

      setTimeout(() => {
        mon.stop();
        assert(mon.qualityLevel == 1);
        clearInterval(loop);
        done();
      }, 30);
    });


    it('should set actual perormance to 0 when onSimulationStep not called', function(done) {
      let mon = new PerformanceMonitor();
      mon._checkInterval = 1;
      mon.start();

      setTimeout(() => {
        mon.stop();
        assert.equal(0, mon.actualPerfomance)
        mon.stop();
        done();
      }, 20);
    });

  });

});
