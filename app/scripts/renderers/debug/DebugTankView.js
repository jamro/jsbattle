/* globals PIXI */
'use strict';

var AbstractPixiTankView = require("../abstractPixi/AbstractPixiTankView.js");

module.exports = class DebugTankView extends AbstractPixiTankView  {

  constructor(model) {
    super(model);
  }

  _createBody() {
    var body = new PIXI.Graphics();
    body.lineStyle(1, 0xffff00, 0.8);
    body.beginFill(0x00ff00, 0.5);
    body.drawRect(-15, -15, 30, 30);
    body.endFill();
    return body;
  }

  _createGun() {
    var body = new PIXI.Graphics();
    body.beginFill(0x00ff00, 0.5);
    body.lineStyle(1, 0xffff00, 0.8);
    body.drawCircle(0, 0, 10);
    body.drawRect(0, -3, 30, 6);
    body.endFill();
    return body;
  }

  _createRadar() {
    var body = new PIXI.Graphics();
    body.beginFill(0x00ff00, 0.5);
    body.lineStyle(1, 0xffff00, 0.8);
    body.drawRect(-3, -10, 6, 20);
    body.endFill();
    body.lineStyle();
    body.beginFill(0xaaffaa, 0.1);
    body.moveTo(0, -3);
    var radarRange = 300;
    var radarFocal = 6;
    var width = radarRange * Math.tan(radarFocal*(Math.PI/180))/2;
    body.lineTo(radarRange, -width);
    body.lineTo(radarRange, width);
    body.lineTo(0, 3);
    return body;
  }

  _createLabel() {
    var labelStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 12,
        fill: 0x00ff00
    });
    var label = new PIXI.Text("", labelStyle);
    label.anchor.set(0.5, 0.5);
    label.x = 0;
    label.y = -40;
    return label;
  }

  _createHudBackground() {
    var statusBarBg =  new PIXI.Graphics();
    statusBarBg.beginFill(0x000000, 1);
    statusBarBg.lineStyle(1, 0xffff00, 0.8);
    statusBarBg.drawRect(-26, -3, 52, 6);
    statusBarBg.y = -30;
    return statusBarBg;
  }

  _createEnergyBar() {
    var energyBar =  new PIXI.Graphics();
    energyBar.beginFill(0x00ff00, 1);
    energyBar.drawRect(0, -2, 50, 4);
    energyBar.x = -25;
    energyBar.y = -30;
    return energyBar;
  }

  update() {
    super.update();

  }

};
