'use strict';

var Tank = require("./Tank.js");
var Bullet = require("./Bullet.js");
var Battlefield = require("./Battlefield.js");
var EventStore = require("./EventStore.js");
var CollisionResolver = require("./CollisionResolver.js");
var AiWrapper = require("./AiWrapper.js");
var PerformanceMonitor = require("./PerformanceMonitor.js");
var seedrandom = require("seedrandom");


module.exports = class Simulation {

  constructor(renderer) {
    this._aiList = [];
    this._allTankList = [];
    this._tankList = [];
    this._bulletList = [];
    this._explodedTankList = [];
    this._explodedBulletList = [];
    this._battlefield = new Battlefield();
    this._simulationTimeout = null;
    this._renderInterval = null;
    this._simulationStepDuration = 17;
    this._renderStepDuration = 30;
    this._renderer = renderer;
    this._isRunning = false;
    this._collisionResolver = new CollisionResolver();
    this._rngSeed = (new Date()).getTime();
    this._rng = seedrandom(this._rngSeed);
    this._speedMultiplier = 1;
    this._onSimulationStepCallback = [];
    this._onRenderStepCallback = [];
    this._onFinishCallback = [];
    this._onErrorCallback = [];
    this._onStartCallback = [];
    this._timeElapsed = 0;
    this._timeLimit = 30000;
    this._eventStore = new EventStore();
    this._nextTankId = 1;
    this._nextBulletId = 1;
    this._rendererQuality = 'auto';
    this._perfMon = new PerformanceMonitor();
    this._perfMon.setSimulationStepDuration(this._simulationStepDuration/this._speedMultiplier);
    Math.random = this._rng;
  }

  init(width, height) {
    this._battlefield.setSize(width, height);
    this._renderer.initBatlefield(this._battlefield);
    this._collisionResolver.updateBattlefield(this._battlefield);
  }

  setRendererQuality(v) {
    if(isNaN(v) && v != 'auto') return;
    if(!isNaN(v)) {
      v = Math.min(1, Math.max(0, v));
    }
    this._rendererQuality = v;
  }

  get tankList() {
    return this._allTankList;
  }

  onStep(callback) {
    this._onSimulationStepCallback.push(callback);
  }

  onRender(callback) {
    this._onRenderStepCallback.push(callback);
  }

  onStart(callback) {
    this._onStartCallback.push(callback);
  }

  onFinish(callback) {
    this._onFinishCallback.push(callback);
  }

  onError(callback) {
    this._onErrorCallback.push(callback);
  }

  get renderer() {
    return this._renderer;
  }

  get battlefield() {
    return this._battlefield;
  }

  get timeElapsed() {
    return this._timeElapsed;
  }

  get timeLimit() {
    return this._timeLimit;
  }

  set timeLimit(v) {
    this._timeLimit = v;
  }


  setSpeed(v) {
    this._speedMultiplier = Math.max(0.01, Number(v));
    this._perfMon.setSimulationStepDuration(this._simulationStepDuration/this._speedMultiplier);
    this._renderer.setSpeed(v);
  }

  start() {
    this._isRunning = true;
    var i;
    var self = this;

    if(this._renderInterval) {
      clearInterval(this._renderInterval);
      this._renderInterval = null;
    }

    this._activateAi()
      .then(function(result) {
        self._renderInterval = setInterval(function () {
          self._updateView();
        }, self._renderStepDuration);

        if(self._simulationTimeout) {
          clearTimeout(self._simulationTimeout);
        }
        self._perfMon.start();
        for(i=0; i < self._onStartCallback.length; i++) self._onStartCallback[i]();
        self._simulationStep();
      })
      .catch(function(err) {
        console.error(err.message);
        console.error(err);
        for(i=0; i < self._onErrorCallback.length; i++) self._onErrorCallback[i](err.message ? err.message : "Error during simulation");
      });
  }

  _simulationStep() {
    this._perfMon.onSimulationStep();
    var startTime = (new Date()).getTime();
    var self = this;
    var i;
    this._updateModel();
    this._updateAi()
      .then(function(result) {
        if(self._getTanksLeft() <= 1 || self._timeElapsed == self._timeLimit) {
          self.stop();
          self._updateView();
          for(i=0; i < self._onFinishCallback.length; i++) self._onFinishCallback[i]();
        }
        if(self._isRunning) {
          var processingTime = (new Date()).getTime() - startTime;
          var dt = self._simulationStepDuration - processingTime;
          dt = Math.max(1, dt);
          dt /= self._speedMultiplier;
          dt = Math.round(dt);

          for(i=0; i < self._onSimulationStepCallback.length; i++) self._onSimulationStepCallback[i]();
          self._timeElapsed = Math.min(self._timeElapsed + self._simulationStepDuration, self._timeLimit);
          if(dt >= 1) {
            self._simulationTimeout = setTimeout(self._simulationStep.bind(self), dt);
          } else {
            self._simulationStep();
          }

        }

      })
      .catch(function(err) {
        console.error(err.message);
        console.error(err);
        for(i=0; i < self._onErrorCallback.length; i++) self._onErrorCallback[i](err.message ? err.message : "Error during simulation");
      });
  }

  stop() {
    this._isRunning = false;
    this._perfMon.stop();
    this._renderer.stop();
    if(this._simulationTimeout) {
      clearTimeout(this._simulationTimeout);
      this._simulationTimeout = null;
    }
    if(this._renderInterval) {
      clearInterval(this._renderInterval);
      this._renderInterval = null;
    }
    var tank, ai, i;
    for(i=0; i < this._aiList.length; i++) {
      ai = this._aiList[i];
      if(!ai) continue;
      ai.deactivate();
    }

  }

  addTank(aiDefinition) {
    if(typeof aiDefinition != 'object') {
      throw "AI definition must be an object";
    }
    if(!this._battlefield) {
      throw "Simulation not initialized";
    }
    var startSlot = this._battlefield.getStartSlot();
    if(!startSlot) {
      throw "No free space in the battlefield";
    }
    var tank = this._createTank(aiDefinition);
    tank.randomize();
    tank.moveTo(startSlot.x, startSlot.y);
    this._tankList.push(tank);
    this._allTankList.push(tank);
    if(this._allTankList.length > 2) {
      this._timeLimit += 2000;
    }

    var ai = this._createAiWrapper(tank, aiDefinition);
    this._aiList.push(ai);

    return ai;
  }

  _activateAi() {
    var self = this;
    return new Promise(function (resolve, reject) {
      var promise = new Promise(function(done, err) { done(); });

      promise = self._aiList.reduce(function (chain, ai) {
        if(!ai) {
          return chain;
        } else {
          return chain.then(ai.activate.bind(ai, self._rngSeed));
        }
      }, promise);
      promise
        .then(function() {
          resolve();
        })
        .catch(function(err) {
          reject(err);
        });
    });
  }

  _updateAi() {
    var self = this;
    return new Promise(function (resolve, reject) {

      var promise = new Promise(function(done, err) { done(); });

      promise = self._aiList.reduce(function (chain, ai) {
      	if(!ai) {
        	return chain;
        } else {
        	return chain.then(ai.simulationStep.bind(ai));
        }
      }, promise);
      promise
        .then(function() {
          resolve();
        })
        .catch(function(err) {
          reject(err);
        });
    });
  }

  _updateModel() {
    let i, tank, bullet, ai;

    for(i=0; i < this._tankList.length; i++) {
      tank = this._tankList[i];
      if(!tank) continue;
      tank.simulationStep(this._collisionResolver);
    }

    var killCount = 0;
    for(i=0; i < this._tankList.length; i++) {
      tank = this._tankList[i];
      if(!tank) continue;
      if(tank.energy <= 0) {
        killCount++;
        this._tankList[i] = null;
        this._explodedTankList.push(tank);
        this._collisionResolver.removeTank(tank);
        this._eventStore.add("tank_" + tank.id, {
          type: "destroy",
          tank: tank
        });
      }
    }
    for(i=0; i < this._aiList.length; i++) {
      ai = this._aiList[i];
      if(!ai) continue;
      if(ai.tank.energy <= 0) {
        this._aiList[i] = null;
        ai.deactivate();
      }
    }

    for(i=0; i < this._tankList.length; i++) {
      tank = this._tankList[i];
      if(!tank) continue;
      if(tank.isShooting) {
        var power = tank.handleShoot();
        bullet = this._createBullet(tank, power);
        this._bulletList.push(bullet);
        this._eventStore.add("tank_" + tank.id, {
          type: "shoot",
          tank: tank,
          bullet: bullet
        });
      }
    }
    for(i=0; i < this._tankList.length; i++) {
      tank = this._tankList[i];
      if(!tank) continue;
      for(var j=0; j < killCount; j++) {
        tank.onSurviveScore();
      }
    }
    let hitTest;
    for(i=0; i < this._bulletList.length; i++) {
      bullet = this._bulletList[i];
      if(!bullet) continue;
      bullet.simulationStep();
      hitTest = this._collisionResolver.hitTestBullet(bullet);
      if(hitTest) {
        this._bulletList[i] = null;
        this._explodedBulletList.push(bullet);
        this._collisionResolver.removeBullet(bullet);
        this._eventStore.add("bullet_" + bullet.id, {
          type: "explode",
          bullet: bullet
        });
      }
    }
  }

  _updateView() {
    if(this._rendererQuality == 'auto') {
      this._renderer.quality = this._perfMon.qualityLevel;
    } else {
      this._renderer.quality = this._rendererQuality;
    }
    let i, tank, bullet;
    this._renderer.preRender();
    this._renderer.renderClock(this._timeElapsed, this._timeLimit);
    for(i=0; i < this._tankList.length; i++) {
      tank = this._tankList[i];
      if(!tank) continue;
      this._renderer.renderTank(tank, this._eventStore.get("tank_" + tank.id));
    }
    for(i=0; i < this._bulletList.length; i++) {
      bullet = this._bulletList[i];
      if(!bullet) continue;
      this._renderer.renderBullet(bullet, this._eventStore.get("bullet_" + bullet.id));
    }
    while(this._explodedTankList.length) {
      tank = this._explodedTankList.pop();
      this._renderer.renderTank(tank, this._eventStore.get("tank_" + tank.id));
    }
    while(this._explodedBulletList.length) {
      bullet = this._explodedBulletList.pop();
      this._renderer.renderBullet(bullet, this._eventStore.get("bullet_" + bullet.id));
    }
    this._renderer.renderTankStats(this._allTankList);
    this._renderer.postRender();
    for(i=0; i < this._onRenderStepCallback.length; i++) this._onRenderStepCallback[i]();
    this._eventStore.clear();
  }

  _getTanksLeft() {
    var tanksLeft = 0;
    var tank;
    for(var i=0; i < this._tankList.length; i++) {
      tank = this._tankList[i];
      if(!tank) continue;
      tanksLeft++;
    }
    return tanksLeft;
  }

  _createAiWrapper(tank, aiDefinition) {
    return new AiWrapper(tank, aiDefinition);
  }

  _createTank(aiDefinition) {
    var tank = new Tank(aiDefinition, this._nextTankId++);
    return tank;
  }

  _createBullet(owner, power) {
    var bullet = new Bullet(owner, this._nextBulletId++, power);
    return bullet;
  }

};
