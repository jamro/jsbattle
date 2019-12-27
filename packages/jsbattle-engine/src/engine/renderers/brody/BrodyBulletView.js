'use strict';
import { Sprite } from 'pixi.js';
import { BLEND_MODES } from 'pixi.js';
import AbstractPixiBulletView from "../abstractPixi/AbstractPixiBulletView.js";

export default class BrodyBulletView extends AbstractPixiBulletView  {

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
    let bullet = Sprite.from('bullet');
    bullet.anchor.set(0.5);
    let glow = Sprite.from('glow');
    glow.anchor.set(0.5);
    glow.blendMode = BLEND_MODES.ADD;
    glow.alpha = 0.1;
    this._glow = glow;
    container.addChild(glow);
    container.addChild(bullet);
  }

}
