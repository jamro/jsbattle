'use strict';
import { Sprite } from 'pixi.js';

import AbstractPixiBulletView from "../abstractPixi/AbstractPixiBulletView.js";

export default class BWBulletView extends AbstractPixiBulletView  {

  constructor(model) {
    super(model);
  }

  _create(container) {
    let bullet = Sprite.from('bullet');
    bullet.anchor.set(0.5);
    container.addChild(bullet);
  }

}
