/* globals PIXI */
'use strict';

import AbstractPixiRenderer from "../abstractPixi/AbstractPixiRenderer.js";
import BWBattlefieldView from "./BWBattlefieldView.js";
import BWClockView from "./BWClockView.js";
import BWBulletView from "./BWBulletView.js";
import BWTankView from "./BWTankView.js";

export default class BWRenderer extends AbstractPixiRenderer  {

  constructor() {
    super('bw');
    this._bigBoomAnim = [];
    this._smallBoomAnim = [];
    this._shakeTimer = 0;
  }

  onAssetsLoaded() {
    for(let i=0; i <= 9; i++) {
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
    let anim = new PIXI.extras.AnimatedSprite(type);
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

}
