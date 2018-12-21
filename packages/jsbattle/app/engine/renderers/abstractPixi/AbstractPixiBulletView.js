/* globals PIXI */
'use strict';

import AbstractPixiView from "./AbstractPixiView.js";

export default class AbstractPixiBulletView extends AbstractPixiView {

  constructor(model) {
    super(model);
  }

  update(events) {
    super.update(events);
    this.view.scale.x = this.view.scale.y = this.model.power * 0.7 + 0.3;
    if(this.model.exploded) {
      this.destroy();
    }
  }

}
