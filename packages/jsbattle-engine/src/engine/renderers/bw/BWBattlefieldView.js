'use strict';
import { Sprite } from 'pixi.js';
import AbstractPixiView from "../abstractPixi/AbstractPixiView.js";

export default class BWBattlefieldView extends AbstractPixiView  {

  _create(container) {
    let background = Sprite.from('battlefield');
    container.addChild(background);
  }

  update(events) {

  }
}
