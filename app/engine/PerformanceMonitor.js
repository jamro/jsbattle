'use strict';

module.exports = class PerformanceMonitor {

  constructor() {
    this._simulationStepDuration = 30;
    this._stepCounter=0;
    this._checkLoop=0;
    this._started=false;
    this._desiredPerfomance = Math.floor(1000/this._simulationStepDuration);
    this._actualPerfomance = this._desiredPerfomance;
    this._perfomanceIndex = 1;
    this._desiredQuality = 1;
    this._quality = this._desiredQuality;
    this._checkInterval = 500;
  }

  get started() {
    return this._started;
  }

  get desiredPerfomance() {
    return this._desiredPerfomance;
  }

  get actualPerfomance() {
    return this._actualPerfomance;
  }

  start() {
    this._started = true;
    var self = this;
    this._checkLoop = setInterval(() => {
      self._check();
    }, this._checkInterval);
  }

  stop() {
    this._started = false;
    if(this._checkLoop) {
      clearInterval(this._checkLoop);
      this._checkLoop = null;
    }
  }

  setSimulationStepDuration(v) {
    if(v != this._simulationStepDuration) {
      this._quality = this._desiredQuality;
    }
    this._simulationStepDuration = v;
    this._desiredPerfomance = Math.floor(1000/v);
  }

  onSimulationStep() {
    if(this._started) {
      this._stepCounter++;
    }
  }

  get qualityLevel() {
    return this._quality;
  }

  _check() {
    this._actualPerfomance = Math.ceil(this._stepCounter*(1000/this._checkInterval));
    this._stepCounter = 0;
    var index = this._desiredPerfomance ? this._actualPerfomance/this._desiredPerfomance : 1;
    this._perfomanceIndex = (this._perfomanceIndex + index)/2;
    this._updateQuality();
  }

  _updateQuality() {
    var lowestQuality = 2.5*this._perfomanceIndex - 1.25;
    lowestQuality = Math.max(0, Math.min(1, lowestQuality));
    var decreaseStep = -0.5*this._perfomanceIndex + 0.45;

    if(this._perfomanceIndex > 1) {
      this._desiredQuality += 0.1;
    } else {
      this._desiredQuality -= decreaseStep;
    }

    this._desiredQuality = Math.max(0, Math.min(1, this._desiredQuality));

    var targetQuality = Math.max(lowestQuality, this._desiredQuality);

    this._desiredQuality = (this._desiredQuality + targetQuality)/2;
    if(this._desiredQuality < this._quality ) {
      this._quality = this._desiredQuality;
    } else {
      this._quality = (this._desiredQuality + 9*this._quality)/10;
    }
  }
};
