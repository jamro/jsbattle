import sinon from "sinon";

export default class WorkerMock {

  constructor(name) {
    this.name = name;
    this.onmessage = sinon.spy();
    this.postMessage = sinon.spy();
    this.terminate = sinon.spy();
  }

};
