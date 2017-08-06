var sinon = require('sinon');

module.exports = class RendererMock {

  constructor() {
    this.quality = 1;
    this.preRender = sinon.spy();
    this.postRender = sinon.spy();
    this.renderTank = sinon.spy();
    this.renderTankStats = sinon.spy();
    this.renderBullet = sinon.spy();
    this.renderClock = sinon.spy();
    this.initBatlefield = sinon.spy();
    this.stop = sinon.spy();
  }
};
