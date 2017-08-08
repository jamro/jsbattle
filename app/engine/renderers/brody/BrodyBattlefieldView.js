/* globals PIXI */
'use strict';

var AbstractPixiView = require("../abstractPixi/AbstractPixiView.js");

module.exports = class BrodyBattlefieldView extends AbstractPixiView  {

  constructor(model) {
    super(model);
    this._holeList = [];
    this._settings = null;
  }

  configure(settings) {
    this._settings = settings;
  }

  _create(container) {
    var background = PIXI.Sprite.fromFrame('battlefield');
    container.addChild(background);

    var groundMask = new PIXI.Graphics();
    groundMask.beginFill(0x0000ff, 1);
    groundMask.moveTo(25, 25);
    groundMask.lineTo(900-25, 25);
    groundMask.lineTo(900-25, 600-25);
    groundMask.lineTo(90, 600-25);
    groundMask.lineTo(90, 600-35);
    groundMask.lineTo(25, 600-35);
    groundMask.lineTo(25, 25);
    groundMask.endFill();


    this._pointerContainer = new PIXI.Container();
    this._pointer = PIXI.Sprite.fromFrame('debug_mark');
    this._pointer.anchor.set(0.5);
    this._pointer.visible = false;
    this._pointerContainer.mask = groundMask;
    this._pointerContainer.addChild(this._pointer);


    this._craterContainer = new PIXI.Container();
    this._craterContainer.mask = groundMask;
    container.addChild(this._craterContainer);
    container.addChild(groundMask);



    var wallMask = new PIXI.Graphics();
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
    this._holesContainer = new PIXI.Container();
    this._holesContainer.mask = wallMask;
    container.addChild(this._holesContainer);
    container.addChild(this._pointerContainer);
    container.addChild(wallMask);
  }

  addCrater(x, y) {
    var crater = PIXI.Sprite.fromFrame('crater');
    crater.anchor.set(0.5);
    crater.x = x - this.model.offsetX;
    crater.y = y - this.model.offsetY;
    crater.blendMode = PIXI.BLEND_MODES.MULTIPLY;
    crater.alpha = 0.8;
    this._craterContainer.addChild(crater);
  }

  update() {
    super.update();
    this._holesContainer.visible = (this._settings.skratchLimit > 0);
    this._craterContainer.visible = this._settings.showCraters;
    this._pointer.alpha = Math.max(0, this._pointer.alpha - 0.01);
  }

  addBulletHole(x, y, power) {
    var rotation = 0;
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

    var hole = PIXI.Sprite.fromFrame('hole');
    hole.anchor.set(0.5);
    hole.x = x - this.model.offsetX;
    hole.y = y - this.model.offsetY;
    hole.rotation = rotation;
    hole.scale.x = hole.scale.y = 0.7 + 0.5*power;
    this._holesContainer.addChild(hole);
    this._holeList.push(hole);
    var limit = this._settings ? this._settings.skratchLimit : 20;
    while(this._holeList.length > limit) {
      hole = this._holeList.shift();
      hole.parent.removeChild(hole);
    }
  }

  showPointer(x, y) {
    this._pointer.visible = true;
    this._pointer.x = x - this.model.offsetX;
    this._pointer.y = y - this.model.offsetY;
  }

  hidePointer() {
    this._pointer.visible = false;
  }
};
