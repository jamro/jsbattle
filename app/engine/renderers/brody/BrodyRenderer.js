/* globals PIXI */
'use strict';

var AbstractPixiRenderer = require("../abstractPixi/AbstractPixiRenderer.js");
var BrodyBattlefieldView = require("./BrodyBattlefieldView.js");
var BrodyClockView = require("./BrodyClockView.js");
var BrodyBulletView = require("./BrodyBulletView.js");
var BrodyTankView = require("./BrodyTankView.js");
var BrodySettings = require("./BrodySettings.js");

module.exports = class BrodyRenderer extends AbstractPixiRenderer  {

  constructor() {
    super('brody');
    this._bigBoomAnim = [];
    this._shakeTimer = 0;
    this._particleContainer = null;
    this._particleList = [];
    this._explosionList = [];
    this._settings = new BrodySettings();
    this._masterContainer.addChild(this._bulletContainer);
    this._frameTimer = 0;
    this._frameCounter = 0;
    this._fpsInterval = null;
    this._fps = 30;
  }

  onAssetsLoaded() {
    var i;
    for(i=0; i <= 22; i++) {
      this._bigBoomAnim.push(PIXI.Texture.fromFrame('big_boom_0' + (i < 10 ? "0" + i : i)));
    }
  }

  get quality() {
    return this._settings.quality;
  }

  set quality(v) {
    this._settings.quality = v;
  }

  initBatlefield(battlefield) {
    super.initBatlefield(battlefield);
    this.battlefieldView.configure(this._settings);
    this._particleContainer = new PIXI.particles.ParticleContainer(1000, {
      position: true,
      rotation: true,
      alpha: true
    });
    this._masterContainer.addChild(this._particleContainer);
    this._masterContainer.addChild(this._hudContainer);

    var self = this;
    this._fpsInterval = setInterval(function() {
      self._fps = self._frameCounter;
      self._frameCounter = 0;
    }, 1000);
  }

  renderTank(tank, events) {
    super.renderTank(tank, events);
    var i;
    for(i in events) {
      if(events[i].type == 'destroy') {
        this._shakeTimer = 10;
        this._addTankExplosion(tank);
        break;
      }
    }

    var directionCorrection = tank.throttle > 0 ? 180 : 0;
    var dirtAngle = (tank.angle+directionCorrection)*(Math.PI/180);
    if(tank.speed > 1) {
      var corner1X = tank.x + 20*Math.cos(dirtAngle-Math.PI/4) + 7*Math.cos(dirtAngle);
      var corner1Y = tank.y + 20*Math.sin(dirtAngle-Math.PI/4) + 7*Math.sin(dirtAngle);
      var corner2X = tank.x + 20*Math.cos(dirtAngle+Math.PI/4) + 7*Math.cos(dirtAngle);
      var corner2Y = tank.y + 20*Math.sin(dirtAngle+Math.PI/4) + 7*Math.sin(dirtAngle);

      this._addDirt(
        corner1X,
        corner1Y
      );
      this._addDirt(
        corner2X,
        corner2Y
      );
    }
  }

  renderBullet(bullet, events) {
    super.renderBullet(bullet, events);
    var view = this.getBulletView(bullet.id);
    view.configure(this._settings);
    if(bullet.exploded) {
      this._addBulletExplosion(bullet);
      this.battlefieldView.addBulletHole(bullet.x, bullet.y, bullet.power);
    }
  }

  preRender() {
    super.preRender();
    var particle;
    var particleCount = 0;
    var i;
    for(i = this._particleList.length-1; i >= 0; i--) {
      particle = this._particleList[i];
      if(!particle) {
        continue;
      }

      particle.x += particle.speed * particle.rotation * Math.cos(particle.rotation);
      particle.y += particle.speed * particle.rotation * Math.sin(particle.rotation);
      particle.alpha = Math.max(0, particle.alpha-particle.alphaSpeed);

      particle.lifetime--;
      if(particle.lifetime <= 0 || particleCount > this._settings.particleLimit) {
        particle.parent.removeChild(particle);
        this._particleList[i] = null;
      } else {
        particleCount++;
      }
    }
    for(i=0; i < this._explosionList.length; i++) {
      if(!this._explosionList[i]) continue;
      this._explosionList[i].alpha *= 0.7;
      if(this._explosionList[i].alpha < 0.01) {
        this._explosionList[i].parent.removeChild(this._explosionList[i]);
        this._explosionList[i] = null;
      }
    }

  }

  postRender() {
    this._frameTimer++;
    this._frameCounter++;
    if(this._frameTimer % this._settings.dropFrames == 0){
      super.postRender();
    }
    if(this._shakeTimer > 0) {
      this._shakeTimer--;
      this.masterContainer.x = Math.random()*10-5-this.offsetX;
      this.masterContainer.y = Math.random()*10-5-this.offsetY;
      this._battlefieldView.view.x = Math.random()*10-5;
      this._battlefieldView.view.y = Math.random()*10-5;
    } else {
      this.masterContainer.x = -this.offsetX;
      this.masterContainer.y = -this.offsetY;
      this._battlefieldView.view.x = 0;
      this._battlefieldView.view.y = 0;
    }
  }

  stop() {
    if(this._fpsInterval) {
      clearInterval(this._fpsInterval);
    }
  }

  _addTankExplosion(tank) {
    this._addExplosion(tank.x, tank.y, this._bigBoomAnim);
    this.battlefieldView.addCrater(tank.x, tank.y);
    this._addSparks(
      tank.x,
      tank.y,
      300
    );
  }

  _addBulletExplosion(bullet) {
    this._addGlow(bullet.x, bullet.y, 0.3 + 0.6*bullet.power);
    var sparks = 5 + 40 * bullet.power;
    this._addSparks(
      bullet.x,
      bullet.y,
      sparks
    );
  }

  _createBattlefieldView(battlefield) {
    return new BrodyBattlefieldView(battlefield);
  }

  _createClockView(clock) {
    return new BrodyClockView(clock);
  }

  _createBulletView(bullet) {
    return new BrodyBulletView(bullet);
  }

  _createTankView(tank) {
    return new BrodyTankView(tank);
  }

  _addExplosion(x, y, type) {
    this._addGlow(x, y, 5);

    var anim = new PIXI.extras.AnimatedSprite(type);
    anim.anchor.set(0.5);
    this.masterContainer.addChild(anim);
    anim.x = x;
    anim.y = y;
    anim.loop = false;
    anim.blendMode = PIXI.BLEND_MODES.ADD;
    anim.onComplete = function() {
      this.stop();
      this.parent.removeChild(this);
    };
    anim.play();
  }

  _addGlow(x, y, scale) {
    if(!this._settings.showGlow) return;
    var glow = PIXI.Sprite.fromFrame('glow');
    glow.anchor.set(0.5);
    glow.scale.x = glow.scale.y = scale;
    glow.alpha = 0.4;
    glow.blendMode = PIXI.BLEND_MODES.ADD;
    glow.x = x;
    glow.y = y;
    this.masterContainer.addChild(glow);
    this._explosionList.push(glow);
  }

  _addSparks(x, y, amount) {
    amount = Math.ceil(amount*this._settings.quality);
    for(var i=0; i < amount; i++) {
      var particle = PIXI.Sprite.fromFrame('spark');
      particle.x = x;
      particle.y = y;
      particle.alphaSpeed = 0;
      particle.anchor.set(0.5);
      particle.speed = 1+Math.random()*2;
      particle.rotation = Math.random()*2*Math.PI;
      particle.lifetime = 5+Math.random()*5;
      this._particleContainer.addChild(particle);
      this._particleList.push(particle);
    }
  }

  _addDirt(x, y) {
    if(!this._settings.showDirt) return;
    for(var i=0; i < 5; i++) {
      var index = Math.floor(Math.random()*3);
      var particle = PIXI.Sprite.fromFrame('dirt_' + index);
      particle.x = x+Math.random()*4-2;
      particle.y = y+Math.random()*4-2;
      particle.anchor.set(0.5);
      particle.speed = 0;
      particle.alphaSpeed = 0.02 + Math.random()*0.02;
      particle.rotation = 0;
      particle.alpha = 0.1+0.4*Math.random();
      particle.lifetime = 25;
      particle.scale.x = particle.scale.y = 0.5 + 2*Math.random();
      this._particleContainer.addChild(particle);
      this._particleList.push(particle);
    }
  }

};
