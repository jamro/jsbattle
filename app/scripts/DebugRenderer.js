/* globals PIXI */
'use strict';

var Renderer = require("./Renderer.js");

module.exports = class DebugRenderer extends Renderer  {

  constructor() {
    super();
    this._canvas = null;
    this._context = null;
    this._renderer = null;
    this._stage = null;
    this._tankMap = [];
    this._bulletMap = [];
    this._explosionList = [];
    this._fpsLabel = null;
    this._clockLabel = null;
    this._scoreBoard = null;
    this._tankContainer = null;
    this._frameCounter = 0;
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

    var background = new PIXI.Graphics();
    background.beginFill(0x555555);
    background.drawRect(0, 0, this._canvas.width, this._canvas.height);
    background.endFill();
    this._stage.addChild(background);

    background = new PIXI.Graphics();
    background.beginFill(0x555555);
    background.lineStyle(1, 0x999999);
    background.drawRect(25, 25, this._canvas.width-50, this._canvas.height-50);
    background.endFill();
    this._stage.addChild(background);

    this._tankContainer = new PIXI.Sprite();
    this._stage.addChild(this._tankContainer);

    var labelStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 10,
        fill: ['#ffffff'], // gradient
        stroke: '#000000',
        strokeThickness: 2,
        wordWrap: true,
        wordWrapWidth: 200,
    });

    this._fpsLabel = new PIXI.Text("FPS", labelStyle);
    this._fpsLabel.x = 5;
    this._fpsLabel.y = 5;
    this._stage.addChild(this._fpsLabel);

    this._clockLabel = new PIXI.Text("", labelStyle);
    this._clockLabel.x = 100;
    this._clockLabel.y = 5;
    this._stage.addChild(this._clockLabel);

    this._scoreBoard = new PIXI.Text("", labelStyle);
    this._scoreBoard.x = 5;
    this._scoreBoard.y = 20;
    this._stage.addChild(this._scoreBoard);

    var self = this;
    setInterval(function() {
      self._fpsLabel.text = "FPS: " + self._frameCounter;
      self._frameCounter = 0;
    }, 1000);

    this._renderer.render(this._stage);
  }

  init(canvas) {
    this._canvas = canvas;
  }

  preRender() {
    this._frameCounter++;
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

    this._renderer.render(this._stage);
  }

  renderTankStats(tankList) {
    var scores = [];
    var i;
    for(i=0; i < tankList.length; i++) {
      scores.push({
        name: tankList[i].fullName,
        energy: tankList[i].energy,
        value: tankList[i].score,
      });
    }
    scores.sort(function(a,b) {
      if (a.value < b.value) return 1;
      if (a.value > b.value) return -1;
      return 0;
    });
    var msg = "";
    for(i=0; i < scores.length; i++) {
      msg += scores[i].value.toFixed(3) + " - " + scores[i].name + (scores[i].energy == 0 ? " [X]" : "" ) + "\n";
    }
    this._scoreBoard.text = msg;
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

    var debugText;
    if(typeof(tank.debugData) == 'object') {
      var txt = JSON.stringify(tank.debugData, null, 1);
      debugText = (txt == '{}' ? "" : txt);
    } else {
      debugText = tank.debugData;
    }


    tankView.x = tank.x - this._offsetX;
    tankView.y = tank.y - this._offsetY;
    tankView.body.rotation = tank.angle*(Math.PI/180);
    tankView.gun.rotation = tank.gunAngle*(Math.PI/180);
    tankView.shoot.rotation = tank.gunAngle*(Math.PI/180);
    tankView.shoot.alpha = tank.isShooting ? 1 : tankView.shoot.alpha*0.7;
    tankView.radar.rotation = tank.radarAngle*(Math.PI/180);
    tankView.energy.width = 50*(tank.energy/tank.maxEnergy);
    tankView.boost.width = 50*(tank.boost/tank.maxBoost);
    tankView.score.width = 50*Math.min(1, tank.score/500);
    tankView.debug.text = debugText;
    if(tankView.parent && tank.energy == 0) {
      tankView.parent.removeChild(tankView);
      this.addExplosion(tank.x - this._offsetX, tank.y - this._offsetY, 30);
    }
  }

  renderBullet(bullet) {
    var bulletView = null;
    if(this._bulletMap[bullet.id]) {
      bulletView = this._bulletMap[bullet.id];
    } else {
      bulletView = this.createBulletView(bullet);
      this._stage.addChild(bulletView);
      this._bulletMap[bullet.id] = bulletView;
    }

    bulletView.x = bullet.x - this._offsetX;
    bulletView.y = bullet.y - this._offsetY;
    bulletView.rotation = bullet.angle*(Math.PI/180);

    if(bullet.exploded && bulletView.parent) {
      bulletView.parent.removeChild(bulletView);
      this.addExplosion(bullet.x-this._offsetX, bullet.y-this._offsetY, 5+15*bullet.power);
    }
  }

  addExplosion(x, y, size) {
    var explosion = this.createExplosionView(x, y, size);
    this._stage.addChild(explosion);
    this._explosionList.push(explosion);
  }


  createBulletView(bullet) {
    var bulletBody = new PIXI.Graphics();
    bulletBody.beginFill(0xffffff, 1);
    bulletBody.moveTo(5, 0);
    bulletBody.lineTo(-4, -4);
    bulletBody.lineTo(-4, 4);
    bulletBody.lineTo(4, 0);
    bulletBody.endFill();
    bulletBody.scale.x = bulletBody.scale.y = 0.3 + 0.7*bullet.power;
    return bulletBody;
  }


  createExplosionView(x, y, size) {
    var bulletBody = new PIXI.Graphics();
    bulletBody.beginFill(0xffffff, 0.5);
    bulletBody.drawCircle(x, y, size);
    bulletBody.endFill();
    return bulletBody;
  }

  createTankView(tank) {
    var tankBody = new PIXI.Graphics();
    tankBody.beginFill(0x00ff00, 0.3);
    tankBody.lineStyle(1, 0xaaffaa, 1);
    tankBody.drawRect(-15, -15, 30, 30);
    tankBody.endFill();


    var tankGun = new PIXI.Graphics();
    tankGun.beginFill(0x00ff00, 0.3);
    tankGun.lineStyle(1, 0xaaffaa, 1);
    tankGun.drawRect(-5, -3, 30, 6);
    tankGun.endFill();

    var tankRadar = new PIXI.Graphics();
    tankRadar.lineStyle(2, 0xaaffaa, 1);
    tankRadar.moveTo(5, -7);
    tankRadar.lineTo(0, -5);
    tankRadar.lineTo(0, 5);
    tankRadar.lineTo(5, 7);
    tankRadar.lineStyle();
    tankRadar.beginFill(0xaaffaa, 0.05);
    tankRadar.moveTo(0, -3);
    var width = tank.radarRange * Math.tan(tank.radarFocal*(Math.PI/180))/2;
    tankRadar.lineTo(tank.radarRange, -width);
    tankRadar.lineTo(tank.radarRange, width);
    tankRadar.lineTo(0, 3);


    var tankShoot = new PIXI.Graphics();
    tankShoot.beginFill(0xffffff, 0.3);
    tankShoot.drawCircle(26, 0, 7);
    tankShoot.alpha = 0;

    var statusBarBg =  new PIXI.Graphics();
    statusBarBg.beginFill(0x000000, 1);
    statusBarBg.drawRect(-26, -3, 52, 16);
    statusBarBg.y = -30;

    var energyBar =  new PIXI.Graphics();
    energyBar.beginFill(0xff0000, 1);
    energyBar.drawRect(0, -2, 50, 4);
    energyBar.x = -25;
    energyBar.y = -30;

    var boostBar =  new PIXI.Graphics();
    boostBar.beginFill(0xaaaaff, 1);
    boostBar.drawRect(0, -2, 50, 4);
    boostBar.x = -25;
    boostBar.y = -25;

    var scoreBar =  new PIXI.Graphics();
    scoreBar.beginFill(0xffff00, 1);
    scoreBar.drawRect(0, -2, 50, 4);
    scoreBar.x = -25;
    scoreBar.y = -20;
    scoreBar.width = 0;

    var labelStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 10,
        fill: ['#ffffff'], // gradient
        stroke: '#000000',
        strokeThickness: 2,
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

    var debugText = new PIXI.Text("", labelStyle);
    debugText.x = -25;
    debugText.y = 20;

    var tankContainer = new PIXI.Sprite();
    var tankView = new PIXI.Sprite();
    tankContainer.addChild(tankView);
    tankContainer.addChild(statusBarBg);
    tankContainer.addChild(energyBar);
    tankContainer.addChild(boostBar);
    tankContainer.addChild(scoreBar);
    tankContainer.addChild(label);
    tankContainer.addChild(debugText);
    tankView.addChild(tankBody);
    tankView.addChild(tankGun);
    tankView.addChild(tankShoot);
    tankView.addChild(tankRadar);
    tankContainer.gun = tankGun;
    tankContainer.radar = tankRadar;
    tankContainer.shoot = tankShoot;
    tankContainer.body = tankView;
    tankContainer.energy = energyBar;
    tankContainer.boost = boostBar;
    tankContainer.score = scoreBar;
    tankContainer.debug = debugText;

    return tankContainer;
  }
};
//267
