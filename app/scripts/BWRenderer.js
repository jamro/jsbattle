/* globals PIXI */
'use strict';

var Renderer = require("./Renderer.js");

module.exports = class BWRenderer extends Renderer  {

  constructor() {
    super();
    this._canvas = null;
    this._context = null;
    this._renderer = null;
    this._stage = null;
    this._tankMap = [];
    this._bulletMap = [];
    this._explosionList = [];
    this._tankContainer = null;
    this._clockLabel = null;
    this._mainContainer = null;
    this._shakeTimer = 0;
    this._offsetX = 0;
    this._offsetY = 0;
  }

  initBatlefield(battlefield) {
    this._offsetX = battlefield.offsetX;
    this._offsetY = battlefield.offsetY;
    this._context = this._canvas.getContext("2d");

    if(!PIXI) {
      throw "Pixi.js is required!";
    }
    PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;
    this._renderer = new PIXI.CanvasRenderer(this._canvas.width, this._canvas.height, {view: this._canvas});
    this._stage = new PIXI.Container();
    this._mainContainer = new PIXI.Sprite();


    var background = new PIXI.Graphics();
    background.beginFill(0xffffff);
    background.drawRect(0, 0, this._canvas.width, this._canvas.height);
    background.endFill();
    this._stage.addChild(background);
    this._stage.addChild(this._mainContainer);

    background = new PIXI.Graphics();
    background.beginFill(0xffffff);
    background.lineStyle(1, 0x000000, 1);
    background.drawRect(0, 0, this._canvas.width, this._canvas.height);
    background.endFill();

    background.beginFill(0x333333);
    background.lineStyle(1, 0x000000, 1);
    background.drawRect(15, 15, this._canvas.width-30, this._canvas.height-30);
    background.endFill();

    background.beginFill(0xAAAAAA);
    background.lineStyle(1, 0x000000, 1);
    background.moveTo(this._canvas.width-50, 50);
    background.lineTo(this._canvas.width-15, 15);
    background.lineTo(this._canvas.width-15, this._canvas.height-15);
    background.lineTo(15, this._canvas.height-15);
    background.lineTo(50, this._canvas.height-50);
    background.endFill();
    background.moveTo(15, 15);
    background.lineTo(50, 50);
    background.lineTo(this._canvas.width-50, this._canvas.height-50);
    background.lineTo(this._canvas.width-15, this._canvas.height-15);

    background.beginFill(0xeeeeee);
    background.lineStyle(1, 0x000000, 1);
    background.drawRect(24, 24, this._canvas.width-48, this._canvas.height-48);
    background.endFill();
    background.beginFill(0xffffff);
    background.lineStyle(1, 0x000000, 1);
    background.drawRect(0, this._canvas.height-24, 80, 24);
    background.endFill();
    this._mainContainer.addChild(background);

    this._tankContainer = new PIXI.Sprite();
    this._mainContainer.addChild(this._tankContainer);

    var labelStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 15,
        fill: '#000000',
        stroke: '#000000'
    });

    this._clockLabel = new PIXI.Text("", labelStyle);
    this._clockLabel.x = 10;
    this._clockLabel.y = this._canvas.height - 20;
    this._mainContainer.addChild(this._clockLabel);

    this._renderer.render(this._stage);
  }

  init(canvas) {
    this._canvas = canvas;
  }

  preRender() {
    this._frameCounter++;
  }

  postRender() {
    var explosion;
    for(var i=0; i < this._explosionList.length; i++) {
      explosion = this._explosionList[i];
      if(!explosion) continue;
      explosion.alpha *= 0.7;
      if(explosion.alpha < 0.01) {
        explosion.parent.removeChild(explosion);
        this._explosionList[i] = null;
      }
    }

    if(this._shakeTimer > 0) {
      this._shakeTimer--;
      this._mainContainer.x = Math.random()*10-5;
      this._mainContainer.y = Math.random()*10-5;
    } else {
      this._mainContainer.x = 0;
      this._mainContainer.y = 0;
    }

    this._renderer.render(this._stage);
  }

  renderClock(msElapsed, msLimit) {
    var msTotal = Math.max(0, msLimit - msElapsed);
    var s = Math.floor(msTotal/1000);
    var ms = msTotal % 1000;
    s = s.toString();
    while(s.length < 2) s = "0" + s;
    ms = ms.toString();
    while(ms.length < 3) ms = "0" + ms;

    this._clockLabel.text = "0:" + s + "." + ms;
  }

  renderTankStats(tankList) {

  }

  renderTank(tank) {
    var tankView = null;
    if(this._tankMap[tank.id]) {
      tankView = this._tankMap[tank.id];
    } else {
      tankView = this.createTankView(tank);
      this._tankContainer.addChild(tankView);
      this._tankMap[tank.id] = tankView;
    }


    tankView.x = tank.x-this._offsetX;
    tankView.y = tank.y-this._offsetY;
    tankView.body.rotation = tank.angle*(Math.PI/180);
    tankView.gun.rotation = tank.gunAngle*(Math.PI/180);
    tankView.shoot.rotation = tank.gunAngle*(Math.PI/180);
    tankView.shoot.alpha = tank.isShooting ? 1 : tankView.shoot.alpha*0.7;
    tankView.radar.rotation = tank.radarAngle*(Math.PI/180);
    tankView.energy.width = 50*(tank.energy/tank.maxEnergy);
    if(tankView.parent && tank.energy == 0) {
      tankView.parent.removeChild(tankView);
      this.addExplosion(tank.x-this._offsetX, tank.y-this._offsetY, 30);
      this._shakeTimer = 10;
    }
  }

  renderBullet(bullet) {
    var bulletView = null;
    if(this._bulletMap[bullet.id]) {
      bulletView = this._bulletMap[bullet.id];
    } else {
      bulletView = this.createBulletView(bullet);
      this._mainContainer.addChild(bulletView);
      this._bulletMap[bullet.id] = bulletView;
    }

    bulletView.x = bullet.x-this._offsetX;
    bulletView.y = bullet.y-this._offsetY;
    bulletView.rotation = bullet.angle*(Math.PI/180);

    if(bullet.exploded && bulletView.parent) {
      bulletView.parent.removeChild(bulletView);
      this.addExplosion(bullet.x-this._offsetX, bullet.y-this._offsetY, 5+15*bullet.power);
    }
  }

  addExplosion(x, y, size) {
    var explosion = this.createExplosionView(x, y, size);
    this._mainContainer.addChild(explosion);
    this._explosionList.push(explosion);
  }


  createBulletView(bullet) {
    var bulletBody = new PIXI.Graphics();
    bulletBody.beginFill(0x000000, 1);
    bulletBody.moveTo(5, 0);
    bulletBody.lineTo(1, -3);
    bulletBody.lineTo(-4, -3);
    bulletBody.lineTo(-4, 3);
    bulletBody.lineTo(1, 3);
    bulletBody.lineTo(4, 0);
    bulletBody.endFill();
    bulletBody.scale.x = bulletBody.scale.y = 0.3 + 0.7*bullet.power;
    return bulletBody;
  }


  createExplosionView(x, y, size) {
    var bulletBody = new PIXI.Graphics();
    bulletBody.beginFill(0x000000, 0.2);
    bulletBody.drawCircle(x, y, size);
    bulletBody.endFill();
    return bulletBody;
  }

  createTankView(tank) {
    var tankBody = new PIXI.Graphics();
    tankBody.beginFill(0x000000, 1);
    tankBody.lineStyle(1, 0xffffff, 1);
    tankBody.drawRect(-13, -10, 24, 20);
    tankBody.drawRect(-15, -15, 30, 5);
    tankBody.drawRect(-15, 10, 30, 5);
    tankBody.drawRect(-16, -7, 4, 10);
    tankBody.endFill();

    var tankGun = new PIXI.Graphics();
    tankGun.beginFill(0x000000, 1);
    tankGun.lineStyle(1, 0xffffff, 1);
    tankGun.drawCircle(0, 0, 7);
    tankGun.drawRect(0, -2, 25, 4);
    tankGun.drawRect(20, -3, 5, 6);
    tankGun.endFill();

    var tankRadar = new PIXI.Graphics();

    tankRadar.beginFill(0x000000, 1);
    tankRadar.lineStyle(1, 0xffffff, 1);
    tankRadar.moveTo(4, -7);
    tankRadar.lineTo(-1, -4);
    tankRadar.lineTo(-1, -2);
    tankRadar.lineTo(-3, -2);
    tankRadar.lineTo(-3, 2);
    tankRadar.lineTo(-1, 2);
    tankRadar.lineTo(-1, 4);
    tankRadar.lineTo(4, 7);
    tankRadar.lineTo(1, 2);
    tankRadar.lineTo(1, -2);

    var tankShoot = new PIXI.Graphics();
    tankShoot.beginFill(0xffffff, 0.3);
    tankShoot.drawCircle(26, 0, 7);
    tankShoot.alpha = 0;

    var statusBarBg =  new PIXI.Graphics();
    statusBarBg.beginFill(0x000000, 1);
    statusBarBg.drawRect(-26, -3, 52, 6);
    statusBarBg.y = -30;

    var energyBar =  new PIXI.Graphics();
    energyBar.beginFill(0xff0000, 1);
    energyBar.drawRect(0, -2, 50, 4);
    energyBar.x = -25;
    energyBar.y = -30;

    var labelStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 10,
        fill: '#000000',
        wordWrap: true,
        wordWrapWidth: 200
    });
    var tankName = tank.name;
    if(tankName.length > 15) {
      tankName = tankName.substring(0, 12) + "...";
    }
    tankName += " #" + tank.id;
    var label = new PIXI.Text(tankName, labelStyle);
    label.anchor.set(0.5, 0.5);
    label.x = 0;
    label.y = -40;

    var tankContainer = new PIXI.Sprite();
    var tankView = new PIXI.Sprite();
    tankContainer.addChild(tankView);
    tankContainer.addChild(statusBarBg);
    tankContainer.addChild(energyBar);
    tankContainer.addChild(label);
    tankView.addChild(tankBody);
    tankView.addChild(tankGun);
    tankView.addChild(tankShoot);
    tankView.addChild(tankRadar);
    tankContainer.gun = tankGun;
    tankContainer.radar = tankRadar;
    tankContainer.shoot = tankShoot;
    tankContainer.body = tankView;
    tankContainer.energy = energyBar;

    return tankContainer;
  }
};
