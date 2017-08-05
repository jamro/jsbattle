/* globals PIXI */
'use strict';

var AbstractPixiBulletView = require("../abstractPixi/AbstractPixiBulletView.js");

module.exports = class BWBulletView extends AbstractPixiBulletView  {

  constructor(model) {
    super(model);
  }

  _create(container) {
    var bullet = PIXI.Sprite.fromFrame('bullet');
    bullet.anchor.set(0.5);
    container.addChild(bullet);
  }

};
