var sinon = require('sinon');

module.exports = class AiWrapperMock {

  constructor(tank) {
    this.tank = tank
    this.activateCallCount = 0;
    this.simulationStepCallCount = 0;
    var self = this;
    this.activate = function(seed, done) {
      setTimeout(done, 1);
      self.activateCallCount++;
    };
    this.deactivate = sinon.spy();
    this.simulationStep = function(done) {
      self.simulationStepCallCount++;
      setTimeout(done, 1);
    };
  }

};
