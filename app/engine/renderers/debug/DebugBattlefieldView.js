/* globals PIXI */
'use strict';

var AbstractPixiView = require("../abstractPixi/AbstractPixiView.js");

module.exports = class DebugBattlefieldView extends AbstractPixiView  {

  _create(container) {
    var background = new PIXI.Graphics();
    background.beginFill(0x000000);
    background.lineStyle(1, 0xffff00, 0.8);
    background.drawRect(0, 0, this.model.width+2*this.model.margin, this.model.height+2*this.model.margin);
    background.endFill();
    container.addChild(background);
    background = new PIXI.Graphics();
    background.beginFill(0x000000);
    background.lineStyle(1, 0xffff00, 0.8);
    background.drawRect(this.model.margin, this.model.margin, this.model.width, this.model.height);
    background.endFill();
    container.addChild(background);
  }

  update(events) {

  }
};
