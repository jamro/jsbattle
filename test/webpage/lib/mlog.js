var mcoloring = require('mocha').reporters.Base.color;

class MLog {

  constructor() {
    this.disabled = true;
  }

  log(msg) {
    if(this.disabled) {
      return;
    }
    console.log(mcoloring('pending', '        ' + msg));
  }
}

export default new MLog();
