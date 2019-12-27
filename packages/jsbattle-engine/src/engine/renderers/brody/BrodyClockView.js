'use strict';
import {
  Text,
  TextStyle
} from 'pixi.js';
import AbstractPixiView from "../abstractPixi/AbstractPixiView.js";

export default class BrodyClockView extends AbstractPixiView  {

  constructor(model) {
    super(model);
  }

  _create(container) {
    let labelStyle = new TextStyle({
        fontFamily: 'Arial',
        fontSize: 15,
        fill: '#000000'
    });

    this._label = new Text("clock", labelStyle);
    this._label.x = 10;
    this._label.y = 600 - 20;
    container.addChild(this._label);
  }

  update(events) {
    this._label.text = this.model.text;
  }
}
