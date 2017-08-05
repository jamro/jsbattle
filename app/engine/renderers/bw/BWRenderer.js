/* globals PIXI */
'use strict';

var AbstractPixiRenderer = require("../abstractPixi/AbstractPixiRenderer.js");
var BWBattlefieldView = require("./BWBattlefieldView.js");
var BWClockView = require("./BWClockView.js");
var BWBulletView = require("./BWBulletView.js");
var BWTankView = require("./BWTankView.js");

module.exports = class BWRenderer extends AbstractPixiRenderer  {

  constructor() {
    super('bw');
    this._bigBoomAnim = [];
    this._smallBoomAnim = [];
    this._shakeTimer = 0;
  }

  onAssetsLoaded() {
    for(var i=0; i <= 9; i++) {
      this._bigBoomAnim.push(PIXI.Texture.fromFrame('big_boom_00' + i));
      this._smallBoomAnim.push(PIXI.Texture.fromFrame('small_boom_00' + i));
    }
  }

  initBatlefield(battlefield) {
    super.initBatlefield(battlefield);
  }

  renderTank(tank, events) {
    super.renderTank(tank, events);
    if(tank.energy == 0) {
      this._shakeTimer = 10;
      this._addExplosion(tank.x, tank.y, this._bigBoomAnim);
    }
  }

  renderBullet(bullet, events) {
    super.renderBullet(bullet, events);
    if(bullet.exploded) {
      this._addExplosion(bullet.x, bullet.y, this._smallBoomAnim);
    }
  }

  postRender() {
    super.postRender();
    if(this._shakeTimer > 0) {
      this._shakeTimer--;
      this.masterContainer.x = Math.random()*10-5-this.offsetX;
      this.masterContainer.y = Math.random()*10-5-this.offsetY;
    } else {
      this.masterContainer.x = -this.offsetX;
      this.masterContainer.y = -this.offsetY;
    }
  }

  _createBattlefieldView(battlefield) {
    return new BWBattlefieldView(battlefield);
  }

  _createClockView(clock) {
    return new BWClockView(clock);
  }

  _createBulletView(bullet) {
    return new BWBulletView(bullet);
  }

  _createTankView(tank) {
    return new BWTankView(tank);
  }

  _addExplosion(x, y, type) {
    var anim = new PIXI.extras.AnimatedSprite(type);
    anim.anchor.set(0.5);
    this.masterContainer.addChild(anim);
    anim.x = x;
    anim.y = y;
    anim.loop = false;
    anim.onComplete = function() {
      this.stop();
      this.parent.removeChild(this);
    };
    anim.play();
  }

};
