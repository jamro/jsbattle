'use strict';

import Tank from "./Tank.js";
import Team from "./Team.js";
import Bullet from "./Bullet.js";
import Battlefield from "./Battlefield.js";
import EventStore from "./EventStore.js";
import CollisionResolver from "./CollisionResolver.js";
import AiWrapper from "./AiWrapper.js";
import PerformanceMonitor from "./PerformanceMonitor.js";
import UltimateBattleDescriptor from "./UltimateBattleDescriptor.js";
import seedrandom from "seedrandom";
import finishCondition from "./finishCondition.js";

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
   * @param {Boolean} debug - turn on logging on the console
   */
  constructor(renderer, debug) {
    this._debug = debug;
    this._aiList = [];
    this._allTankList = [];
    this._tankList = [];
    this._bulletList = [];
    this._explodedTankList = [];
    this._explodedBulletList = [];
    this._battlefield = null;
    this._simulationTimeout = null;
    this._renderInterval = null;
    this._simulationStepDuration = 17;
    this._renderStepDuration = 30;
    this._renderer = renderer;
    this._isRunning = false;
    this._collisionResolver = new CollisionResolver();
    this._rngSeed = (new Date()).getTime() + Math.round(Math.random()*1000000);
    this._rng = seedrandom(this._rngSeed);
    this._speedMultiplier = 1;
    this._onSimulationStepCallback = [];
    this._onRenderStepCallback = [];
    this._onFinishCallback = [];
    this._onErrorCallback = [];
    this._onStartCallback = [];
    this._timeElapsed = 0;
    this._timeLimit = 30000;
    this._finishCondition = finishCondition;
    this._customFinishCondition = false;
    this._eventStore = new EventStore();
    this._nextTankId = 1;
    this._nextBulletId = 1;
    this._rendererQuality = 'auto';
    this._perfMon = new PerformanceMonitor();
    this._perfMon.setSimulationStepDuration(this._simulationStepDuration/this._speedMultiplier);
    this._callStackLimit = Number.MAX_VALUE;
    this._callStackCount = 0;
    this._teamMap = [];
    this._teamList = [];
    this._nextTeamIdndex = 1;
    this._ultimateBattleDescriptor = new UltimateBattleDescriptor();
    this.log('Contructing Simulation');
  }

  /**
    * Seed random number generator. Each time when you seed rng with the same data
    * it will return the same sequence of numbers. That feature can be used
    * to reconstruct exactly the same, "randomized" simulation condidtions.
    *
    * IMPORTANT! set it just after calling constructor of the calss. Otherwise
    * some RNG calls could be unseeded.
    *
    * @param {Number} seed - rng seed data
    */
  setRngSeed(seed) {
    this.log(`Set renderer RNG Seed to '${seed}'`);
    this._rngSeed = seed;
    this._ultimateBattleDescriptor.setRngSeed(seed);
    this._rng = seedrandom(this._rngSeed);
  }

  /**
   * @return seed of random number generator
   */
  getRngSeed() {
    return this._rngSeed;
  }

  /**
   * @return random number from seeded rng
   */
  getRandom() {
    return this._rng();
  }

  /**
   * log message if logging is enabled
   * @param {string} msg - message to log
   */
  log(msg) {
    if(this._debug) {
      console.log('[SIM] ' + msg);
    }
  }

  /**
   * set custom condition of battle finish. Once provided callbacl return true, the simulation will be over
   * @param {Function} callback - callback determining end of the battle. It takes one argument (simulation object) and return true (stop simulation) or false (continue simulation)
   */
  setFinishCondition(callback) {
    this.log(`Setting custom finish conditioins`);
    this._customFinishCondition = true;
    this._finishCondition = callback;
  }

  /**
   * Initialize the battle field. Must be called before any other calls
   * to simulation object
   * @param {Number} width - width of the battlefield
   * @param {Number} height - height of the battlefield
   */
  init(width, height) {
    this.log(`Initialize the battlefield (width=${width}, height=${height})`);
    this._battlefield = new Battlefield();
    this._battlefield.setSize(width, height);
    this._battlefield.randomize(this._rng());
    this._renderer.initBatlefield(this._battlefield);
    this._collisionResolver.updateBattlefield(this._battlefield);
    this.log(`The battlefiield initialized. Done.`);
  }

  /**
   * @return all tanks that were added to the battle
   */
  get tankList() {
    return this._allTankList;
  }

  /**
   * @return list of teams
   */
  get teamList() {
    return this._teamList;
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
    this.log(`Set time limit to '${v}'`);
    this._ultimateBattleDescriptor.setTimeLimit(v);
    this._timeLimit = v;
  }

  /**
   * Starts simulation of the battle. It will initialize all AI scripts, trigger `onStart` event
   * and launch rendering and simulation processing loops. Remember to call `Simulation.init()` and
   * `Simulation.addTank()` before executing this method.
   * @see Simulation.onStart()
   */
  start() {
    this.log(`Starting the simulation`);
    if(this._tankList.length == 0) {
      throw new Error("To start simulation, the tank list cannot be empty!");
    }
    this._isRunning = true;
    let i;
    let self = this;

    if(this._renderInterval) {
      this.log(`Clearing existing render interval`);
      clearInterval(this._renderInterval);
      this._renderInterval = null;
    }

    this.log(`Activating AIs...`);
    this._activateAi(
      () => {
        self._renderInterval = setInterval(() => {
          self._updateView();
        }, self._renderStepDuration);

        if(self._simulationTimeout) {
          clearTimeout(self._simulationTimeout);
        }
        self._perfMon.start();
        self.log(`Notify onStartCallback`);
        for(i=0; i < self._onStartCallback.length; i++) self._onStartCallback[i]();
        self.log(`Run first simulation step`);
        self._simulationStep();
      },
      (err) => {
        console.error(err);
        for(i=0; i < self._onErrorCallback.length; i++) self._onErrorCallback[i](err.message ? err.message : "Error during simulation");
      }
    );
  }

  _simulationStep() {
    this._perfMon.onSimulationStep();
    let startTime = (new Date()).getTime();
    let self = this;
    let i;
    this._updateModel();
    this._updateAi(
      () => {
        if(self._simulationTimeout) {
          clearTimeout(self._simulationTimeout);
          self._simulationTimeout = null;
        }
        if((self._timeLimit > 0 && self._timeElapsed == self._timeLimit) || self._finishCondition(self)) {
          self.stop();
          self._updateModel();
          self._updateView();
          for(i=0; i < self._onFinishCallback.length; i++) self._onFinishCallback[i]();
        }
        if(self._isRunning) {
          let processingTime = (new Date()).getTime() - startTime;
          let dt = self._simulationStepDuration/self._speedMultiplier - processingTime;
          dt = Math.round(dt);
          for(i=0; i < self._onSimulationStepCallback.length; i++) self._onSimulationStepCallback[i]();
          self._timeElapsed += self._simulationStepDuration;
          if(self._timeLimit > 0) {
            self._timeElapsed = Math.min(self._timeElapsed, self._timeLimit);
          }
          if(dt > 0) {
            self._callStackCount=0;
            self._simulationTimeout = setTimeout(self._simulationStep.bind(self), dt);
          } else if(self._callStackCount >= self._callStackLimit) {
            self._simulationTimeout = setTimeout(self._simulationStep.bind(self), 1);
          } else {
            self._callStackCount++;
            self._simulationStep();
          }
        }
      },
      (err) => {
        console.error(err);
        for(i=0; i < self._onErrorCallback.length; i++) self._onErrorCallback[i](err.message ? err.message : "Error during simulation");
      }
    );
  }

  /**
   * Create a tank according to provided `AiDefinition`. Remember to add at
   * least two tanks to the battle. Otherwise, it will stop immediately and
   * the winner will be recognized
   * @param {AiDefinition} - defintion of tank AI script
   */
  addTank(aiDefinition) {
    this.log(`Adding tank...`);
    if(typeof aiDefinition != 'object') {
      throw "AI definition must be an object";
    }
    if(!this._battlefield) {
      throw "Simulation not initialized";
    }
    if(!aiDefinition.teamName) {
      throw "Team name cannot be empty!";
    }
    let startSlot = this._battlefield.getStartSlot();
    if(!startSlot) {
      throw "No free space in the battlefield";
    }
    this._ultimateBattleDescriptor.addAiDefinition(aiDefinition);
    this._ultimateBattleDescriptor.setTeamMode(this.hasTeams());
    let tank = this._createTank(aiDefinition);
    tank.randomize(this.getRandom());
    tank.moveTo(startSlot.x, startSlot.y);
    this._tankList.push(tank);
    this._allTankList.push(tank);
    if(this._timeLimit > 0 && this._allTankList.length > 2) {
      this._timeLimit += 2000;
    }

    if(!this._teamMap[aiDefinition.teamName]) {
      this._teamMap[aiDefinition.teamName] = new Team(aiDefinition.teamName, this._nextTeamIdndex);
      this._nextTeamIdndex+=1;
      this._teamList.push(this._teamMap[aiDefinition.teamName]);
    }
    this._teamMap[aiDefinition.teamName].addTank(tank);

    let ai = this._createAiWrapper(tank, aiDefinition);
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
    this.log(`Set speed to '${v}'`);
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
    this.log(`Set rederer quality to '${v}'`);
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
    this.log(`stopping the simulation`);
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
    let ai, i;
    for(i=0; i < this._aiList.length; i++) {
      ai = this._aiList[i];
      if(!ai) continue;
      ai.deactivate();
    }
    this._aiList = [];
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

  /**
   * Create Ultimate Battle Descriptor that contains all data requied to replay
   * the battle and reflect its exact course.
   * @return UltimateBattleDescriptor object
   */
  createUltimateBattleDescriptor() {
    if(this._customFinishCondition) {
      throw new Error('Cannot create UBD for battles with custom battle finish condition!');
    }
    return this._ultimateBattleDescriptor.clone();
  }

  /**
   * @return true if at least two tanks are cooperating within one team
   */
  hasTeams() {
    return this._teamList.length != this._tankList.length;
  }

  _activateAi(done, error) {
    this._runInSequence(this._aiList, 'activate', this._rng(), done, error);
  }

  _updateAi(done, error) {
    this._runInSequence(this._aiList, 'simulationStep', null, done, error);
  }

  _runInSequence(objectList, methodName, argument, done, error) {
    if(objectList.length == 0) {
      return done();
    }
    function wrapCallback() {
      let args = [];
      let callback = arguments[1];
      let self = arguments[0];
      for(let i=2; i < arguments.length; i++) {
        args.push(arguments[i]);
      }
      return (args2) => {
        callback.apply(self, args.concat(args2));
      };
    }

    let self = null;
    let doneWrapper = wrapCallback(self, done);
    let errorWrapper = wrapCallback(self, error);

    let c;
    if(argument) {
      c = wrapCallback(objectList[objectList.length-1], objectList[objectList.length-1][methodName], argument, doneWrapper, errorWrapper);
    } else {
      c = wrapCallback(objectList[objectList.length-1], objectList[objectList.length-1][methodName], doneWrapper, errorWrapper);
    }
    for(let i=objectList.length-2; i >=0; i--) {
      if(argument) {
        c = wrapCallback(objectList[i], objectList[i][methodName], argument, c, errorWrapper);
      } else {
        c = wrapCallback(objectList[i], objectList[i][methodName], c, errorWrapper);
      }
    }
    c();
  }

  _updateModel() {
    let i, tank, bullet, ai;

    for(i=0; i < this._tankList.length; i++) {
      tank = this._tankList[i];
      if(!tank) continue;
      tank.simulationStep(this._collisionResolver);
    }

    let killCount = 0;
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
    let newAiList = [];
    for(i=0; i < this._aiList.length; i++) {
      ai = this._aiList[i];
      if(!ai) continue;
      if(ai.tank.energy <= 0) {
        this._aiList[i] = null;
        ai.deactivate();
        continue;
      }
      newAiList.push(ai);
    }
    this._aiList = newAiList;

    for(i=0; i < this._tankList.length; i++) {
      tank = this._tankList[i];
      if(!tank) continue;
      if(tank.isShooting) {
        let power = tank.handleShoot();
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
      for(let j=0; j < killCount; j++) {
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
    for(i in this._teamMap) {
      this._teamMap[i].processMessages();
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

  _createAiWrapper(tank, aiDefinition) {
    return new AiWrapper(tank, aiDefinition);
  }

  _createTank(aiDefinition) {
    let tank = new Tank(aiDefinition, this._nextTankId++);
    return tank;
  }

  _createBullet(owner, power) {
    let bullet = new Bullet(owner, this._nextBulletId++, power);
    return bullet;
  }

}
export default Simulation;
