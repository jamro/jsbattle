/* globals PIXI */
'use strict';

import AbstractPixiView from "../abstractPixi/AbstractPixiView.js";

export default class BWBattlefieldView extends AbstractPixiView  {

  _create(container) {
    let background = PIXI.Sprite.fromFrame('battlefield');
    container.addChild(background);
  }

  update(events) {

  }
}
