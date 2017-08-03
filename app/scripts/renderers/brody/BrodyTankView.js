/* globals PIXI */
'use strict';

var AbstractPixiTankView = require("../abstractPixi/AbstractPixiTankView.js");

module.exports = class BrodyTankView extends AbstractPixiTankView  {

  constructor(model) {
    super(model);
  }

  update(events) {
    super.update(events);
    this._shoot.alpha =  this._shoot.alpha*0.8;
    this._tankGun.x = this._tankGun.x*0.8;
    this.radar.rotation = (- this.model.gunAngle + this._model.radarAngle) * (Math.PI/180);
  }

  _onShoot(event) {
    this._tankGun.x = -1-3*event.bullet.power;
    this._shoot.alpha = 1;
  }

  _create(container) {
    super._create(container);
    this._tankGun.addChild(this.radar);
  }

  _createBody() {
    var body = PIXI.Sprite.fromFrame('tank_body');
    body.anchor.set(0.3, 0.5);
    return body;
  }

  _createGun() {
    var gunContainer = new PIXI.Container();

    var tankGun = PIXI.Sprite.fromFrame('tank_gun');
    tankGun.anchor.set(0.3, 0.5);
    gunContainer.addChild(tankGun);
    this._tankGun = tankGun;

    this._shoot = PIXI.Sprite.fromFrame('tank_shoot');
    this._shoot.anchor.set(0.3, 0.5);
    this._shoot.alpha = 0;
    gunContainer.addChild(this._shoot);

    return gunContainer;
  }

  _createRadar() {
    var tankRadar = PIXI.Sprite.fromFrame('tank_radar');
    tankRadar.anchor.set(0.2, 0.5);
    tankRadar.x=-5;
    return tankRadar;
  }

  _createLabel() {
    var labelStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 10,
        stroke: 0x000000,
        strokeThickness: 2,
        fill: 0xffffbb
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
    statusBarBg.drawRect(-26, -3, 52, 6);
    statusBarBg.y = -30;
    return statusBarBg;
  }

  _createEnergyBar() {
    var energyBar =  new PIXI.Graphics();
    energyBar.beginFill(0xffff99, 1);
    energyBar.drawRect(0, -2, 50, 4);
    energyBar.x = -25;
    energyBar.y = -30;
    return energyBar;
  }

};
