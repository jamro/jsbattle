'use strict';
import {
  Text,
  TextStyle
} from 'pixi.js';
import { Container } from 'pixi.js';
import { Sprite } from 'pixi.js';
import { Graphics } from 'pixi.js';

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
    let body = Sprite.from('tank_body');
    body.anchor.set(0.5);
    return body;
  }

  _createGun() {
    let gunContainer = new Container();

    let tankGun = Sprite.from('tank_gun');
    tankGun.anchor.set(0.3, 0.5);
    gunContainer.addChild(tankGun);

    this._shoot = Sprite.from('tank_shoot');
    this._shoot.anchor.set(-1.2, 0.5);
    this._shoot.alpha = 0;
    gunContainer.addChild(this._shoot);

    return gunContainer;
  }

  _createRadar() {
    let tankRadar = Sprite.from('tank_radar');
    tankRadar.anchor.set(0.5);
    return tankRadar;
  }

  _createLabel() {
    let labelStyle = new TextStyle({
        fontFamily: 'Arial',
        fontSize: 12,
        fill: 0x000000
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
    statusBarBg.drawRect(-26, -3, 52, 6);
    statusBarBg.y = -30;
    return statusBarBg;
  }

  _createEnergyBar() {
    let energyBar =  new Graphics();
    energyBar.beginFill(0xff0000, 1);
    energyBar.drawRect(0, -2, 50, 4);
    energyBar.x = -25;
    energyBar.y = -30;
    return energyBar;
  }

}
