'use strict';
import { Graphics } from 'pixi.js';
import AbstractPixiBulletView from "../abstractPixi/AbstractPixiBulletView.js";

export default class DebugBulletView extends AbstractPixiBulletView  {

  constructor(model) {
    super(model);
  }

  _create(container) {
    let bullet = new Graphics();
    bullet.beginFill(0x00ff00, 0.5);
    bullet.drawCircle(0, 0, 5);
    bullet.endFill();
    container.addChild(bullet);
  }

}
