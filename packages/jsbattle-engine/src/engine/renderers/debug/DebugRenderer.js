'use strict';
import {
  Text,
  TextStyle
} from 'pixi.js';
import AbstractPixiRenderer from "../abstractPixi/AbstractPixiRenderer.js";
import DebugBattlefieldView from "./DebugBattlefieldView.js";
import DebugClockView from "./DebugClockView.js";
import DebugBulletView from "./DebugBulletView.js";
import DebugTankView from "./DebugTankView.js";

export default class DebugRenderer extends AbstractPixiRenderer  {

  constructor() {
    super();
    this._frameCounter = 0;
    this._fpsLabel = null;
    this._scoreBoard = null;
  }

  initBatlefield(battlefield) {
    super.initBatlefield(battlefield);

    let labelStyle = new TextStyle({
      fontFamily: 'Arial',
      fontSize: 12,
      fill: '#00ff00'
    });

    this._fpsLabel = new Text("FPS", labelStyle);
    this._fpsLabel.x = 100;
    this._fpsLabel.y = 5;
    this.stage.addChild(this._fpsLabel);

    let self = this;
    setInterval(() => {
      self._fpsLabel.text = "FPS: " + self._frameCounter;
      self._frameCounter = 0;
    }, 1000);

    labelStyle = new TextStyle({
      fontFamily: 'Arial',
      fontSize: 12,
      fill: '#00ff00'
    });

    this._scoreBoard = new Text("scores", labelStyle);
    this._scoreBoard.x = battlefield.margin+2;
    this._scoreBoard.y = battlefield.margin+2;
    this._scoreBoard.alpha = 0.5;
    this.stage.addChild(this._scoreBoard);
  }

  renderTankStats(tankList) {
    super.renderTankStats(tankList);
    let scores = [];
    let i;
    for(i=0; i < tankList.length; i++) {
      scores.push({
        name: tankList[i].fullName,
        energy: tankList[i].energy,
        value: tankList[i].score,
      });
    }
    scores.sort((a,b) => {
      if (a.value < b.value) return 1;
      if (a.value > b.value) return -1;
      return 0;
    });
    let msg = "";
    for(i=0; i < scores.length; i++) {
      msg += scores[i].value.toFixed(3) + " - " + scores[i].name + (scores[i].energy == 0 ? " [X]" : "" ) + "\n";
    }
    this._scoreBoard.text = msg;
  }

  postRender() {
    super.postRender();
    this._frameCounter++;
  }

  _createBattlefieldView(battlefield) {
    return new DebugBattlefieldView(battlefield);
  }

  _createClockView(clock) {
    return new DebugClockView(clock);
  }

  _createBulletView(bullet) {
    return new DebugBulletView(bullet);
  }

  _createTankView(tank) {
    return new DebugTankView(tank);
  }

}
