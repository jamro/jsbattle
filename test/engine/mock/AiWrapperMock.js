var sinon = require('sinon');

module.exports = class AiWrapperMock {

  constructor(tank) {
    this.tank = tank
    this.activate = sinon.stub().returns(new Promise(function(done) {
      setTimeout(done, 1);
    }));
    this.deactivate = sinon.spy();
    this.simulationStep = sinon.stub().returns(new Promise(function(done) {
      setTimeout(done, 1);
    }));
  }

};
