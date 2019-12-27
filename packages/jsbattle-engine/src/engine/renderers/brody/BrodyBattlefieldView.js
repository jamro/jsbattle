'use strict';
import { Container } from 'pixi.js';
import { Sprite } from 'pixi.js';
import { BLEND_MODES } from 'pixi.js';
import { Graphics } from 'pixi.js';
import AbstractPixiView from "../abstractPixi/AbstractPixiView.js";

export default class BrodyBattlefieldView extends AbstractPixiView  {

  constructor(model) {
    super(model);
    this._holeList = [];
    this._settings = null;
  }

  configure(settings) {
    this._settings = settings;
  }

  _create(container) {
    let background = Sprite.from('battlefield');
    container.addChild(background);

    let groundMask = new Graphics();
    groundMask.beginFill(0x0000ff, 1);
    groundMask.moveTo(25, 25);
    groundMask.lineTo(900-25, 25);
    groundMask.lineTo(900-25, 600-25);
    groundMask.lineTo(90, 600-25);
    groundMask.lineTo(90, 600-35);
    groundMask.lineTo(25, 600-35);
    groundMask.lineTo(25, 25);
    groundMask.endFill();

    this._craterContainer = new Container();
    this._craterContainer.mask = groundMask;
    container.addChild(this._craterContainer);
    container.addChild(groundMask);

    let wallMask = new Graphics();
    wallMask.beginFill(0x0000ff, 0.4);
    wallMask.moveTo(15, 15);
    wallMask.lineTo(900-15, 15);
    wallMask.lineTo(900-15, 600-15);
    wallMask.lineTo(80, 600-15);
    wallMask.lineTo(80, 600-25);
    wallMask.lineTo(15, 600-25);
    wallMask.lineTo(15, 15);
    wallMask.lineTo(25, 25);
    wallMask.lineTo(25, 600-25);
    wallMask.lineTo(80, 600-25);
    wallMask.lineTo(80, 600-25);
    wallMask.lineTo(900-25, 600-25);
    wallMask.lineTo(900-25, 25);
    wallMask.lineTo(25, 25);
    wallMask.endFill();
    this._holesContainer = new Container();
    this._holesContainer.mask = wallMask;
    container.addChild(this._holesContainer);
    container.addChild(wallMask);
  }

  addCrater(x, y) {
    let crater = Sprite.from('crater');
    crater.anchor.set(0.5);
    crater.x = x - this.model.offsetX;
    crater.y = y - this.model.offsetY;
    crater.blendMode = BLEND_MODES.MULTIPLY;
    crater.alpha = 0.8;
    this._craterContainer.addChild(crater);
  }

  update() {
    super.update();
    this._holesContainer.visible = (this._settings.skratchLimit > 0);
    this._craterContainer.visible = this._settings.showCraters;
  }

  addBulletHole(x, y, power) {
    let rotation = 0;
    if(Math.abs(y - this.model.maxY) < 10) {
      y = this.model.maxY + 3 +  Math.random()*3;
    } else if(Math.abs(y - this.model.minY) < 10) {
      y = this.model.minY - 3 -  Math.random()*3;
    } else if(Math.abs(x - this.model.maxX) < 10) {
      x = this.model.maxX + 3 +  Math.random()*3;
      rotation = Math.PI/2;
    } else if(Math.abs(x - this.model.minX) < 10) {
      x = this.model.minX - 3 -  Math.random()*3;
      rotation = Math.PI/2;
    } else {
      return;
    }

    let hole = Sprite.from('hole');
    hole.anchor.set(0.5);
    hole.x = x - this.model.offsetX;
    hole.y = y - this.model.offsetY;
    hole.rotation = rotation;
    hole.scale.x = hole.scale.y = 0.7 + 0.5*power;
    this._holesContainer.addChild(hole);
    this._holeList.push(hole);
    let limit = this._settings ? this._settings.skratchLimit : 20;
    while(this._holeList.length > limit) {
      hole = this._holeList.shift();
      hole.parent.removeChild(hole);
    }
  }

}
