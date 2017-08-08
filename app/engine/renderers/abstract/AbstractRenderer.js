'use strict';

var Renderer = require("../Renderer.js");
var AbstractView = require("./AbstractView.js");

module.exports = class AbstractRenderer extends Renderer  {

  constructor() {
    super();
    this._tankMap = [];
    this._bulletMap = [];
    this._offsetX = 0;
    this._offsetY = 0;
    this._speedMultiplier = 1;
  }

  get offsetX() {
    return this._offsetX;
  }

  get offsetY() {
    return this._offsetY;
  }

  get speedMultiplier () {
    return this._speedMultiplier;
  }

  initBatlefield(battlefield) {
    this._offsetX = battlefield.offsetX;
    this._offsetY = battlefield.offsetY;
  }

  renderTank(tank, events) {
    this._renderModel(tank, events, this._tankMap, this._createTankView);
  }

  renderBullet(bullet, events) {
    this._renderModel(bullet, events, this._bulletMap, this._createBulletView);
  }

  getBulletView(id) {
    return this._bulletMap[id];
  }

  getTankView(id) {
    return this._tankMap[id];
  }

  setSpeed(v) {
    this._speedMultiplier = v;
  }
  _renderModel(model, events, map, factory) {
    var view = null;
    if(map[model.id]) {
      view = map[model.id];
    } else {
      view = factory(model);
      map[model.id] = view;
    }
    view.update(events);
    return view;
  }

  _createTankView(tank) {
    return new AbstractView(tank);
  }

  _createBulletView(bullet) {
    return new AbstractView(bullet);
  }

};
