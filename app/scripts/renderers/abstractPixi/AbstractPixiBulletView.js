/* globals PIXI */
'use strict';

var AbstractPixiView = require("./AbstractPixiView.js");

module.exports = class AbstractPixiBulletView extends AbstractPixiView {

  constructor(model) {
    super(model);
  }

  update() {
    super.update();
    this.view.scale.x = this.view.scale.y = this.model.power * 0.7 + 0.3;
    if(this.model.exploded) {
      this.destroy();
    }
  }

};
