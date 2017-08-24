const extendedMath = require('../tanks/lib/extendedMath.js');

class TankController {
  constructor() {
    this._initCallback = () => {};
    this._loopCallback = () => {};
  }

  loop(callback) {
    this._loopCallback = callback;
  }

  init(callback) {
    this._initCallback = callback;
  }
}

class EvalWorker {

  constructor() {
    this.onmessage = (msg) => {};
    this._callStackLimit = 100;
    this._callStackCount = 0;
    this._tankController = new TankController();
  }

  postMessage(inputData) {
    let response = null;
    if(inputData.command == 'init') {
      if(!inputData.code) throw "The code is required!";
      let seed = inputData.seed;
      let settings = inputData.settings;
      let info = inputData.info;
      var Math = extendedMath();

      let tank = this._tankController;
      eval(inputData.code);  // jshint ignore:line
      tank._initCallback(settings, info);
      response = {data: {type: 'init', settings: settings}};
    } else if (inputData.command == 'update') {
      let state = inputData.state;
      let control = inputData.control;
      if(this._tankController._loopCallback) {
        this._tankController._loopCallback(state, control);
        response = {data: control};
      } else {
        response = {data: control};
      }
    }
    if(this._callStackCount < this._callStackLimit) {
      this._callStackCount++;
      this.onmessage(response);
    } else {
      this._callStackCount = 0;
      setTimeout(() => {
        this.onmessage(response);
      }, 1);
    }

  }

  terminate() {

  }
}

export default EvalWorker;
