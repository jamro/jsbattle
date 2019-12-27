'use strict';
import {
  Text,
  TextStyle
} from 'pixi.js';
import { Graphics } from 'pixi.js';
import AbstractPixiTankView from "../abstractPixi/AbstractPixiTankView.js";

export default class DebugTankView extends AbstractPixiTankView  {

  constructor(model) {
    super(model);
  }

  _createBody() {
    let body = new Graphics();
    body.lineStyle(1, 0xffff00, 0.8);
    body.beginFill(0x00ff00, 0.5);
    body.drawRect(-15, -15, 30, 30);
    body.endFill();
    return body;
  }

  _createGun() {
    let body = new Graphics();
    body.beginFill(0x00ff00, 0.5);
    body.lineStyle(1, 0xffff00, 0.8);
    body.drawCircle(0, 0, 10);
    body.drawRect(0, -3, 30, 6);
    body.endFill();
    return body;
  }

  _createRadar() {
    let body = new Graphics();
    body.beginFill(0x00ff00, 0.5);
    body.lineStyle(1, 0xffff00, 0.8);
    body.drawRect(-3, -10, 6, 20);
    body.endFill();
    body.lineStyle();
    body.beginFill(0xaaffaa, 0.1);
    body.moveTo(0, -3);
    let radarRange = 300;
    let radarFocal = 6;
    let width = radarRange * Math.tan(radarFocal*(Math.PI/180))/2;
    body.lineTo(radarRange, -width);
    body.lineTo(radarRange, width);
    body.lineTo(0, 3);
    return body;
  }

  _createLabel() {
    let labelStyle = new TextStyle({
        fontFamily: 'Arial',
        fontSize: 12,
        fill: 0x00ff00
    });
    let label = new Text("", labelStyle);
    label.anchor.set(0.5, 0.5);
    label.x = 0;
    label.y = -40;
    return label;
  }

  _createHudBackground() {
    let statusBarBg =  new Graphics();
    statusBarBg.beginFill(0x000000, 1);
    statusBarBg.lineStyle(1, 0xffff00, 0.8);
    statusBarBg.drawRect(-26, -3, 52, 6);
    statusBarBg.y = -30;
    return statusBarBg;
  }

  _createEnergyBar() {
    let energyBar =  new Graphics();
    energyBar.beginFill(0x00ff00, 1);
    energyBar.drawRect(0, -2, 50, 4);
    energyBar.x = -25;
    energyBar.y = -30;
    return energyBar;
  }

}
