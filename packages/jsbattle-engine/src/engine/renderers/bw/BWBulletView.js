/* globals PIXI */
'use strict';

import AbstractPixiBulletView from "../abstractPixi/AbstractPixiBulletView.js";

export default class BWBulletView extends AbstractPixiBulletView  {

  constructor(model) {
    super(model);
  }

  _create(container) {
    let bullet = PIXI.Sprite.fromFrame('bullet');
    bullet.anchor.set(0.5);
    container.addChild(bullet);
  }

}
