/* globals PIXI */
'use strict';

var AbstractPixiView = require("../abstractPixi/AbstractPixiView.js");

module.exports = class BWClockView extends AbstractPixiView  {

  constructor(model) {
    super(model);
  }

  _create(container) {
    var labelStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 15,
        fill: '#000000'
    });

    this._label = new PIXI.Text("clock", labelStyle);
    this._label.x = 10;
    this._label.y = 600 - 20;
    container.addChild(this._label);
  }

  update(events) {
    this._label.text = this.model.text;
  }
};
