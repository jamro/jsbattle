/* globals PIXI */
'use strict';

var AbstractPixiView = require("../abstractPixi/AbstractPixiView.js");

module.exports = class BrodyBattlefieldView extends AbstractPixiView  {

  _create(container) {
    var background = PIXI.Sprite.fromFrame('battlefield');
    container.addChild(background);
  }

  update(events) {

  }
};
