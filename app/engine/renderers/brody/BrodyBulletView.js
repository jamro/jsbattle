/* globals PIXI */
'use strict';

var AbstractPixiBulletView = require("../abstractPixi/AbstractPixiBulletView.js");

module.exports = class BrodyBulletView extends AbstractPixiBulletView  {

  constructor(model, settings) {
    super(model);
  }

  configure(settings) {
    this._settings = settings;
  }

  update(events) {
    super.update(events);
    this._glow.visible = this._settings && this._settings.showGlow;
  }

  _create(container) {
    var bullet = PIXI.Sprite.fromFrame('bullet');
    bullet.anchor.set(0.5);
    var glow = PIXI.Sprite.fromFrame('glow');
    glow.anchor.set(0.5);
    glow.blendMode = PIXI.BLEND_MODES.ADD;
    glow.alpha = 0.1;
    this._glow = glow;
    container.addChild(glow);
    container.addChild(bullet);
  }

};
