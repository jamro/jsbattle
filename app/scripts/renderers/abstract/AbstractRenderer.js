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
  }

  get offsetX() {
    return this._offsetX;
  }

  get offsetY() {
    return this._offsetY;
  }

  initBatlefield(battlefield) {
    this._offsetX = battlefield.offsetX;
    this._offsetY = battlefield.offsetY;
  }

  renderTank(tank) {
    return this._renderModel(tank, this._tankMap, this._createTankView);
  }

  renderBullet(bullet) {
    return this._renderModel(bullet, this._bulletMap, this._createBulletView);
  }

  _renderModel(model, map, factory) {
    var view = null;
    if(map[model.id]) {
      view = map[model.id];
    } else {
      view = factory(model);
      map[model.id] = view;
    }
    view.update();
    return view;
  }

  _createTankView(tank) {
    return new AbstractView(tank);
  }

  _createBulletView(bullet) {
    return new AbstractView(bullet);
  }

};
