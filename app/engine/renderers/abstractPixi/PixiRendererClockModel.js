module.exports = class PixiRendererClockModel {

  construct() {
    this._msElapsed = 0;
    this._msLimit = 0;
  }

  update(msElapsed, msLimit) {
    this._msElapsed = msElapsed;
    this._msLimit = msLimit;
  }

  get msElapsed() {
    return this._msElapsed;
  }

  get msLimit() {
    return this._msLimit;
  }

  get text() {
    var msTotal = Math.max(0, this._msLimit - this._msElapsed);
    var s = Math.floor(msTotal/1000);
    var ms = msTotal % 1000;
    s = s.toString();
    while(s.length < 2) s = "0" + s;
    ms = ms.toString();
    while(ms.length < 3) ms = "0" + ms;

    return "0:" + s + "." + ms;
  }

};
