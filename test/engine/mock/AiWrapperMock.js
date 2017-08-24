import sinon from "sinon";

export default class AiWrapperMock {

  constructor(tank) {
    this.tank = tank
    this.activateCallCount = 0;
    this.simulationStepCallCount = 0;
    let self = this;
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
