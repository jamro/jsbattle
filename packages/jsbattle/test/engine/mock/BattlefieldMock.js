import sinon from "sinon";

export default class BattlefieldMock {

  constructor() {
    this.setSize = sinon.spy();
    this.getStartSlot = sinon.stub().returns({x: 10, y: 10});
    this.width = 500;
    this.height = 500;
    this.minX = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.minY = 0;
    this.maxX = this.width;
    this.maxY = this.height;
  }

};
