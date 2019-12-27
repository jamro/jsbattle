'use strict';
import { Container } from 'pixi.js';
import { Sprite } from 'pixi.js';
import { Text } from 'pixi.js';
import AbstractPixiView from "./AbstractPixiView.js";

export default class AbstractPixiTankView extends AbstractPixiView {

  constructor(model) {
    super(model);
    this._hudView = new Container();
    this._createHud(this._hudView);
  }

  get body() {
    return this._body;
  }

  get hudView() {
    return this._hudView;
  }

  get gun() {
    return this._gun;
  }

  get radar() {
    return this._radar;
  }

  get label() {
    return this._label;
  }

  get energyBar() {
    return this._energyBar;
  }

  update(events) {
    super.update(events);
    this.view.rotation = 0;
    this.body.rotation = this.model.angle * (Math.PI/180);
    this.gun.rotation = (this.model.angle + this.model.gunAngle) * (Math.PI/180);
    this.radar.rotation = (this.model.angle + this.model.radarAngle) * (Math.PI/180);
    this.energyBar.scale.x = this.model.energy / this.model.maxEnergy;
    this.label.text = this.model.fullName;

    this.hudView.x = this.view.x;
    this.hudView.y = this.view.y;

    for(let i=0; i < events.length; i++) {
      this._onEvent(events[i]);
    }
  }

  _onEvent(event) {
    switch (event.type) {
      case 'shoot':
        this._onShoot(event);
        break;
      case 'destroy':
        this._onDestroy(event);
        break;
    }
  }

  _onShoot(event) {

  }


  _onDestroy(event) {
    this.destroy();
  }

  _create(container) {
    super._create(container);
    this._body = this._createBody();
    this._gun = this._createGun();
    this._radar = this._createRadar();
    container.addChild(this._body);
    container.addChild(this._gun);
    container.addChild(this._radar);
  }

  _createHud(container) {
    this._label = this._createLabel();
    this._energyBar = this._createEnergyBar();
    container.addChild(this._createHudBackground());
    container.addChild(this._energyBar);
    container.addChild(this._label);
  }

  _createBody() {
    return new Sprite();
  }

  _createGun() {
    return new Sprite();
  }

  _createRadar() {
    return new Sprite();
  }

  _createHudBackground() {
    return new Sprite();
  }

  _createEnergyBar() {
    return new Sprite();
  }

  _createLabel() {
    return new Text();
  }
  destroy() {
    super.destroy();
    if(this.hudView.parent) {
      this.hudView.parent.removeChild(this.hudView);
    }
  }

}
