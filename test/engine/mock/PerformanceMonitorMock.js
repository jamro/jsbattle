var sinon = require('sinon');

module.exports = class PerformanceMonitorMock {

  constructor(name) {
    this.qualityLevel = 1;
    this.start = sinon.spy();
    this.stop = sinon.spy();
    this.setSimulationStepDuration = sinon.spy();
    this.onSimulationStep = sinon.spy();
    this.updateQuality = sinon.spy();
  }


};
