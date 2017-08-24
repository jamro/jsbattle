/* globals PIXI */
'use strict';

import AbstractView from "../abstract/AbstractView.js";

export default class AbstractPixiView extends AbstractView {

  constructor(model) {
    super(model);
    this._model = model;
    this._view = new PIXI.Container();
    this._create(this._view);
  }

  update(events) {
    super.update(events);
    if(this._model.x !== undefined) {
      this._view.x = this._model.x;
    }
    if(this._model.y !== undefined) {
      this._view.y = this._model.y;
    }
    if(this._model.angle !== undefined) {
      this._view.rotation = this._model.angle * (Math.PI / 180);
    }
  }

  destroy() {
    super.destroy();
    if(this.view.parent) {
      this.view.parent.removeChild(this.view);
    }
  }

  _create(container) {

  }

}
