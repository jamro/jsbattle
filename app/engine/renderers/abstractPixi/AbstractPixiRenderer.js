/* globals PIXI */
'use strict';

var AbstractRenderer = require("../abstract/AbstractRenderer.js");
var AbstractPixiView = require("./AbstractPixiView.js");
var AbstractPixiTankView = require("./AbstractPixiTankView.js");
var PixiRendererClockModel = require("./PixiRendererClockModel.js");
var PixiPackerParser = require("pixi-packer-parser");

module.exports = class AbstractPixiRenderer extends AbstractRenderer  {

  constructor(name) {
    super();
    this._name = name;

    if(typeof PIXI === 'undefined') {
      throw "Pixi.js is required!";
    }
    this._masterContainer = new PIXI.Container();
    this._tankContainer = new PIXI.Container();
    this._bulletContainer = new PIXI.Container();
    this._hudContainer = new PIXI.Container();
    this._masterContainer.addChild(this._tankContainer );
    this._masterContainer.addChild(this._bulletContainer);
    this._masterContainer.addChild(this._hudContainer);
    this._renderer = null;
    this._stage = null;
    this._clockModel = new PixiRendererClockModel();
    this._clockView = null;
    this._battlefieldView = null;
    if(window.devicePixelRatio >= 2) {
      this._rendererScale = 2;
    } else {
      this._rendererScale = 1;
    }
  }

  get stage() {
    return this._stage;
  }

  get battlefieldView() {
    return this._battlefieldView;
  }

  get masterContainer() {
    return this._masterContainer;
  }

  initBatlefield(battlefield) {
    super.initBatlefield(battlefield);
    this._masterContainer.x = -this.offsetX;
    this._masterContainer.y = -this.offsetY;

    var rendererSettings = {
      view: this._canvas,
      antialias: false,
      backgroundColor: 0xffffff,
      resolution: window.devicePixelRatio
    };

    this._renderer = new PIXI.autoDetectRenderer(
      battlefield.width + 2 * battlefield.margin,
      battlefield.height + 2 * battlefield.margin,
      rendererSettings
    );
    this._stage = new PIXI.Container();

    this._battlefieldView = this._createBattlefieldView(battlefield);
    this._clockView = this._createClockView(this._clockModel);

    this._stage.addChild(this._battlefieldView.view);
    this._stage.addChild(this._masterContainer);
    this._stage.addChild(this._clockView.view);

    this._renderer.render(this._stage);
  }

  init(canvas) {
    this._canvas = canvas;
  }

  loadAssets(done) {
    if(!this._name) {
      done();
      return;
    }
    var loader = new PIXI.loaders.Loader();
    loader.after(PixiPackerParser(PIXI));
    var resolution = (this._rendererScale == 2) ? "retina" : "web";
    loader.add("img/game_" + this._name + "_" + resolution + ".json");
    var self = this;
    loader.load(function() {
      self.onAssetsLoaded();
      done();
    });
  }

  onAssetsLoaded() {

  }

  preRender() {
    this._battlefieldView.update();
  }

  renderTank(tank, events) {
    super.renderTank(tank, events);
    var view = this.getTankView(tank.id);
    if(!view.parent && view.isAlive) {
      this._tankContainer.addChild(view.view);
      this._hudContainer.addChild(view.hudView);
    }
  }

  renderBullet(bullet, events) {
    super.renderBullet(bullet, events);
    var view = this.getBulletView(bullet.id);
    if(!view.parent && view.isAlive) {
      this._bulletContainer.addChild(view.view);
    }
  }

  renderClock(msElapsed, msLimit) {
    this._clockModel.update(msElapsed, msLimit);
    this._clockView.update();
  }

  postRender() {
    super.postRender();
    this._renderer.render(this._stage);
  }

  _createTankView(tank) {
    return new AbstractPixiTankView(tank);
  }

  _createBulletView(bullet) {
    return new AbstractPixiView(bullet);
  }

  _createBattlefieldView(battlefield) {
    return new AbstractPixiView(battlefield);
  }

  _createClockView(clock) {
    return new AbstractPixiView(clock);
  }

};
