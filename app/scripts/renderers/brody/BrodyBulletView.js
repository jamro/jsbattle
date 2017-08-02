/* globals PIXI */
'use strict';

var AbstractPixiBulletView = require("../abstractPixi/AbstractPixiBulletView.js");

module.exports = class BrodyBulletView extends AbstractPixiBulletView  {

  constructor(model) {
    super(model);
  }

  _create(container) {
    var bullet = PIXI.Sprite.fromFrame('bullet');
    bullet.anchor.set(0.5);
    var glow = PIXI.Sprite.fromFrame('glow');
    glow.anchor.set(0.5);
    glow.blendMode = PIXI.BLEND_MODES.ADD;
    glow.alpha = 0.1;
    container.addChild(glow);
    container.addChild(bullet);
  }

};
