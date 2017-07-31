/* globals PIXI */
'use strict';

var Renderer = require("./Renderer.js");
var PixiPackerParser = require("pixi-packer-parser");

module.exports = class BWRenderer extends Renderer  {

  constructor() {
    super();
    this._canvas = null;
    this._context = null;
    this._renderer = null;
    this._stage = null;
    this._tankMap = [];
    this._bulletMap = [];
    this._tankContainer = null;
    this._clockLabel = null;
    this._mainContainer = null;
    this._shakeTimer = 0;
    this._offsetX = 0;
    this._offsetY = 0;
    this._bigBoomAnim = [];
    this._smallBoomAnim = [];

    if(!PIXI) {
      throw "Pixi.js is required!";
    }
  }

  loadAssets(done) {
    var loader = new PIXI.loaders.Loader();
    loader.after(PixiPackerParser(PIXI));
    loader.add("img/init_en_web.json");
    var self = this;
    loader.load(function() {
      for(var i=0; i <= 9; i++) {
        self._bigBoomAnim.push(PIXI.Texture.fromFrame('big_boom_00' + i));
        self._smallBoomAnim.push(PIXI.Texture.fromFrame('small_boom_00' + i));
      }
      done();
    });
  }

  initBatlefield(battlefield) {
    this._offsetX = battlefield.offsetX;
    this._offsetY = battlefield.offsetY;
    this._context = this._canvas.getContext("2d");

    var rendererSettings = {
      view: this._canvas,
      antialias: true,
      backgroundColor: 0xffffff,
      resolution: window.devicePixelRatio
    };
    this._renderer = new PIXI.CanvasRenderer(battlefield.width+2*battlefield.margin, battlefield.height+2*battlefield.margin, rendererSettings);
    this._stage = new PIXI.Container();
    this._mainContainer = new PIXI.Sprite();

    this._stage.addChild(this._mainContainer);

    var battlefieldBackground = PIXI.Sprite.fromFrame('battlefield');
    this._mainContainer.addChild(battlefieldBackground);

    this._tankContainer = new PIXI.Sprite();
    this._mainContainer.addChild(this._tankContainer);

    var labelStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 15,
        fill: '#000000',
        wordWrap: false
    });
    this._clockLabel = new PIXI.Text("", labelStyle);
    this._clockLabel.x = 10;
    this._clockLabel.y = battlefield.height + 2*battlefield.margin - 20;
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

    tankView.x = Math.round(tank.x-this._offsetX);
    tankView.y = Math.round(tank.y-this._offsetY);
    tankView.body.rotation = tank.angle*(Math.PI/180);
    tankView.gun.rotation = tank.gunAngle*(Math.PI/180);
    tankView.shoot.rotation = tank.gunAngle*(Math.PI/180);
    tankView.shoot.alpha = tank.isShooting ? 1 : tankView.shoot.alpha*0.7;
    tankView.radar.rotation = tank.radarAngle*(Math.PI/180);
    tankView.energy.width = 50*(tank.energy/tank.maxEnergy);
    if(tankView.parent && tank.energy == 0) {
      tankView.parent.removeChild(tankView);
      this.addExplosion(tank.x-this._offsetX, tank.y-this._offsetY, this._bigBoomAnim);
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
      this.addExplosion(bullet.x-this._offsetX, bullet.y-this._offsetY, this._smallBoomAnim);
    }
  }

  addExplosion(x, y, type) {
    var anim = new PIXI.extras.AnimatedSprite(type);
    anim.anchor.set(0.5);
    this._mainContainer.addChild(anim);
    anim.x = x;
    anim.y = y;
    anim.loop = false;
    anim.onComplete = function() {
      this.stop();
      this.parent.removeChild(this);
    };
    anim.play();
  }

  createBulletView(bullet) {
    var bulletBody = PIXI.Sprite.fromFrame('bullet');
    bulletBody.anchor.set(0.5);
    bulletBody.scale.x = bulletBody.scale.y = 0.3 + 0.7 * bullet.power;
    return bulletBody;
  }

  createTankView(tank) {
    var tankBody = PIXI.Sprite.fromFrame('tank_body');
    tankBody.anchor.set(0.5);

    var tankGun = PIXI.Sprite.fromFrame('tank_gun');
    tankGun.anchor.set(0.3, 0.5);

    var tankRadar = PIXI.Sprite.fromFrame('tank_radar');
    tankRadar.anchor.set(0.5);

    var tankShoot = PIXI.Sprite.fromFrame('tank_shoot');
    tankShoot.anchor.set(-1.2, 0.5);

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
        wordWrap: false
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
    tankView.addChild(tankRadar);
    tankView.addChild(tankShoot);
    tankContainer.gun = tankGun;
    tankContainer.radar = tankRadar;
    tankContainer.shoot = tankShoot;
    tankContainer.body = tankView;
    tankContainer.energy = energyBar;

    return tankContainer;
  }
};
