'use strict';

var Tank = require("./Tank.js");
var Bullet = require("./Bullet.js");
var Battlefield = require("./Battlefield.js");
var EventStore = require("./EventStore.js");
var CollisionResolver = require("./CollisionResolver.js");
var AiWrapper = require("./AiWrapper.js");
var PerformanceMonitor = require("./PerformanceMonitor.js");
var seedrandom = require("seedrandom");

/**
 * Battle simulation component. Process the simulation updating all related objects
 * and refreshing the renderer.
 */
class Simulation {
  /**
   * Create Simulation object. Constructor is not available outside of
   * `JsBattle.min.js` library. To create Simulation object use
   * `JsBattle.createSimulation(renderer)` instead
   * @param {Renderer} renderer - Renderer used to present results of the simulation
   */
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

  /**
   * Initialize the battle field. Must be called before any other calls
   * to simulation object
   * @param {Number} width - width of the battlefield
   * @param {Number} height - height of the battlefield
   */
  init(width, height) {
    this._battlefield.setSize(width, height);
    this._renderer.initBatlefield(this._battlefield);
    this._collisionResolver.updateBattlefield(this._battlefield);
  }

  /**
   * @return all tanks that were added to the battle
   */
  get tankList() {
    return this._allTankList;
  }

  /**
   * @return renderer attached to the simulation
   */
  get renderer() {
    return this._renderer;
  }

  get battlefield() {
    return this._battlefield;
  }

  /**
   * @return amount of time that has elapsed from the beginning of the battle (in milliseconds)
   */
  get timeElapsed() {
    return this._timeElapsed;
  }

  /**
   * @return maximum duration of the battle (in milliseconds). The battle will be over after that time.
   */
  get timeLimit() {
    return this._timeLimit;
  }

  set timeLimit(v) {
    this._timeLimit = v;
  }

  /**
   * Starts simulation of the battle. It will initialize all AI scripts, trigger `onStart` event
   * and launch rendering and simulation processing loops. Remember to call `Simulation.init()` and
   * `Simulation.addTank()` before executing this method.
   * @see Simulation.onStart()
   */
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

  /**
   * Create a tank according to provided `AiDefinition`. Remember to add at
   * least two tanks to the battle. Otherwise, it will stop immediately and
   * the winner will be recognized
   * @param {AiDefinition} - defintion of tank AI script
   */
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

  /**
   * Set speed multiplier of the simulation. Setting to `2`means that everything will be
   * two times faster than usual. Setting to `0.5` will simulate the battle 2 times slower
   * than usual
   * @param {Number} multiplier - simulation speed multiplier
   */
  setSpeed(v) {
    this._speedMultiplier = Math.max(0.01, Number(v));
    this._perfMon.setSimulationStepDuration(this._simulationStepDuration/this._speedMultiplier);
    this._renderer.setSpeed(v);
  }

  /**
   * Sets quality of renderer controlled by simulation object.
   * You can specify a value between 0 (lowest quality) and 1 (highest quality)
   * or allow the simulation to adjust it automatically by passing 'auto' string
   * Automatic quality adjustment try to keep the speed of the animation at proper level.
   * If simulation is lagging, quality will be reduced to ensure that the simulation
   * does not take longer than it should
   * @param {Number|String} qualityLevel - number between 0 and 1 or 'auto' string
   */
  setRendererQuality(v) {
    if(isNaN(v) && v != 'auto') return;
    if(!isNaN(v)) {
      v = Math.min(1, Math.max(0, v));
    }
    this._rendererQuality = v;
  }

  /**
   * Stops battle simulation. It also stops rendering loop.
   * After calling this method you should not try to call
   * start to resume the battle but rather create a new
   * Simulation object and initialize it from the beginning
   */
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


  /**
   * Allow adding a callback that will be called after each step of simulation
   * processing loop. The callback takes no arguments. The frequency of this event
   * depends on simulation speed.
   * @param {Function} callback - callback that will be called on each event occurence.
   * @see `Simulation.setSpeed()`
   */
  onStep(callback) {
    this._onSimulationStepCallback.push(callback);
  }

  /**
   * Allow adding a callback that will be called after each refresh of the renderer.
   * The callback takes no arguments. `onRender` and `onStep` event are not synchronized
   * and may be called at different intervals. Increasing of animation speed will not
   * increase rendering frequency. Rendering frequency is affected by quality of
   * rendering parameter
   * @param {Function} callback - callback that will be called on each event occurence.
   * @see `Simulation.setSpeed()`
   * @see `Simulation.setRendererQuality()`
   */
  onRender(callback) {
    this._onRenderStepCallback.push(callback);
  }

  /**
   * Allow adding a callback that will be called when the battle is started.
   * It is executed after initialization of all AI Scripts, just before
   * first step of simulation processing loop. The callback takes no arguments.
   * @param {Function} callback - callback that will be called on each event occurence.
   */
  onStart(callback) {
    this._onStartCallback.push(callback);
  }

  /**
   * Allow adding a callback that will be called when the battle is over.
   * The callback takes no arguments.
   * @param {Function} callback - callback that will be called on each event occurence.
   */
  onFinish(callback) {
    this._onFinishCallback.push(callback);
  }

  /**
   * Allow adding a callback that will be called when an error occur.
   * The callback takes one arguments: error message
   * @param {Function} callback - callback that will be called on each event occurence.
   */
  onError(callback) {
    this._onErrorCallback.push(callback);
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

}
module.exports = Simulation;
