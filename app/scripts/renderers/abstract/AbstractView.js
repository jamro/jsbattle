'use strict';

module.exports = class AbstractView  {

  constructor(model) {
    this._model = model;
    this._view = null;
    this._isAlive = true;
  }

  get isAlive() {
    return this._isAlive;
  }

  destroy() {
    this._isAlive = false;
  }

  get model () {
    return this._model;
  }

  get view () {
    return this._view;
  }

  update() {

  }

};
