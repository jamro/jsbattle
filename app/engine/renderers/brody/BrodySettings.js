'use strict';

export default class BrodySettings   {

  constructor(model) {
    this._particleLimit = 1000;
    this._skratchLimit = 100;
    this._showDirt = true;
    this._showGlow = true;
    this._showCraters = true;
    this._dropFrames = 1;
    this._quality = 1;
    this.quality = this._quality;
  }
  get dropFrames() {
    return this._dropFrames;
  }
  get particleLimit() {
    return this._particleLimit;
  }
  get skratchLimit() {
    return this._skratchLimit;
  }
  get showDirt() {
    return this._showDirt;
  }
  get showGlow() {
    return this._showGlow;
  }
  get showCraters() {
    return this._showCraters;
  }
  get quality() {
    return this._quality;
  }
  set quality(v) {
    v = Math.min(1, Math.max(0, v));
    this._quality = v;
    this._particleLimit = Math.round(1000*v*v);
    this._skratchLimit = Math.round(100*v);
    this._showDirt = (v > 0.2);
    this._showGlow = (v > 0.5);
    this._showCraters = (v > 0.1);
    if(v > 0.3) {
      this._dropFrames = 1;
    } else if(v > 0.2) {
      this._dropFrames = 2;
    } else if(v > 0.1) {
      this._dropFrames = 3;
    } else {
      this._dropFrames = 4;
    }
    this._quality = v;
  }

}
