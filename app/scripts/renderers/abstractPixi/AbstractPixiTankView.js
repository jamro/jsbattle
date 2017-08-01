/* globals PIXI */
'use strict';

var AbstractPixiView = require("./AbstractPixiView.js");

module.exports = class AbstractPixiTankView extends AbstractPixiView {

  constructor(model) {
    super(model);
  }

  get body() {
    return this._body;
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

  update() {
    super.update();
    this.view.rotation = 0;
    this.body.rotation = this.model.angle * (Math.PI/180);
    this.gun.rotation = (this.model.angle + this.model.gunAngle) * (Math.PI/180);
    this.radar.rotation = (this.model.angle + this.model.radarAngle) * (Math.PI/180);
    this.energyBar.scale.x = this.model.energy / this.model.maxEnergy;
    this.label.text = this.model.fullName;

    if(this.model.energy == 0) {
      this.destroy();
    }
  }

  _create(container) {
    super._create(container);
    this._body = this._createBody();
    this._gun = this._createGun();
    this._radar = this._createRadar();
    this._label = this._createLabel();
    this._energyBar = this._createEnergyBar();
    container.addChild(this._body);
    container.addChild(this._gun);
    container.addChild(this._radar);
    container.addChild(this._createHudBackground());
    container.addChild(this._energyBar);
    container.addChild(this._label);
  }

  _createBody() {
    return new PIXI.Sprite();
  }

  _createGun() {
    return new PIXI.Sprite();
  }

  _createRadar() {
    return new PIXI.Sprite();
  }

  _createHudBackground() {
    return new PIXI.Sprite();
  }

  _createEnergyBar() {
    return new PIXI.Sprite();
  }

  _createLabel() {
    return new PIXI.Text();
  }

};
