/* globals PIXI */
'use strict';

var AbstractPixiBulletView = require("../abstractPixi/AbstractPixiBulletView.js");

module.exports = class DebugBulletView extends AbstractPixiBulletView  {

  constructor(model) {
    super(model);
  }

  _create(container) {
    var bullet = new PIXI.Graphics();
    bullet.beginFill(0x00ff00, 0.5);
    bullet.drawCircle(0, 0, 5);
    bullet.endFill();
    container.addChild(bullet);
  }

};
