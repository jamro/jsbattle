/* globals PIXI */
'use strict';

import AbstractPixiTankView from "../abstractPixi/AbstractPixiTankView.js";

export default class BWTankView extends AbstractPixiTankView  {

  constructor(model) {
    super(model);
  }

  update(events) {
    super.update(events);
    this._shoot.alpha = this.model.isShooting ? 1 : this._shoot.alpha*0.7;
  }

  _createBody() {
    let body = PIXI.Sprite.from('tank_body');
    body.anchor.set(0.5);
    return body;
  }

  _createGun() {
    let gunContainer = new PIXI.Container();

    let tankGun = PIXI.Sprite.from('tank_gun');
    tankGun.anchor.set(0.3, 0.5);
    gunContainer.addChild(tankGun);

    this._shoot = PIXI.Sprite.from('tank_shoot');
    this._shoot.anchor.set(-1.2, 0.5);
    this._shoot.alpha = 0;
    gunContainer.addChild(this._shoot);

    return gunContainer;
  }

  _createRadar() {
    let tankRadar = PIXI.Sprite.from('tank_radar');
    tankRadar.anchor.set(0.5);
    return tankRadar;
  }

  _createLabel() {
    let labelStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 12,
        fill: 0x000000
    });
    let label = new PIXI.Text("", labelStyle);
    label.anchor.set(0.5, 0.5);
    label.x = 0;
    label.y = -40;
    return label;
  }

  _createHudBackground() {
    let statusBarBg =  new PIXI.Graphics();
    statusBarBg.beginFill(0x000000, 1);
    statusBarBg.drawRect(-26, -3, 52, 6);
    statusBarBg.y = -30;
    return statusBarBg;
  }

  _createEnergyBar() {
    let energyBar =  new PIXI.Graphics();
    energyBar.beginFill(0xff0000, 1);
    energyBar.drawRect(0, -2, 50, 4);
    energyBar.x = -25;
    energyBar.y = -30;
    return energyBar;
  }

}
