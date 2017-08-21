/* globals PIXI */
'use strict';

var AbstractPixiView = require("../abstractPixi/AbstractPixiView.js");

module.exports = class DebugClockView extends AbstractPixiView  {

  constructor(model) {
    super(model);
  }

  _create(container) {
    var labelStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 12,
        fill: '#00ff00'
    });

    this._label = new PIXI.Text("clock", labelStyle);
    this._label.x = 5;
    this._label.y = 5;
    container.addChild(this._label);
  }

  update(events) {
    this._label.text = this.model.text;
  }
};
