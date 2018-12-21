import sinon from "sinon";

export default class CollisionResolverMock {

  constructor() {
    this.checkTank = sinon.stub().returns(true);
    this.updateTank = sinon.spy();
    this.scanTanks = sinon.stub().returns(false);
    this.scanBullets = sinon.stub().returns(false);
    this.scanWalls = sinon.stub().returns(false);
    this.hitTestBullet = sinon.stub().returns(false);
  }

};
