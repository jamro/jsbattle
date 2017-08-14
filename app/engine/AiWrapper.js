'use strict';

var EvalWorker = require('./EvalWorker.js');

module.exports = class AiWrapper {

  constructor(tank, aiDefinition) {
    if(!tank) throw "Tank is required";
    if(!aiDefinition) throw "AiDefinition is required";
    this._tank = tank;
    this._aiWorker = null;
    this._aiProcessingStart = 0;
    this._aiProcessingCheckInterval = null;
    this._aiProcessingResolveCallback = null;
    this._aiProcessingRejectCallback = null;
    this._slowAiChances = 10;
    this._onActivationCallback = [];
    this._onDectivationCallback = [];
    this._aiProcessingTimeLimit = 3000;
    this._aiDefinition = aiDefinition;
    this._isReady = false;
    this._controlData = {
      THROTTLE: 0,
      BOOST: 0,
      TURN: 0,
      RADAR_TURN: 0,
      GUN_TURN: 0,
      SHOOT: 0,
      DEBUG: {}
    };
  }

  setProcessingLimit(v) {
    this._aiProcessingTimeLimit = v;
  }

  get tank() {
    return this._tank;
  }

  get worker() {
    return this._aiWorker;
  }

  onActivation(callback) {
    this._onActivationCallback.push(callback);
  }

  onDectivation(callback) {
    this._onDeactivationCallback.push(callback);
  }

  activate(seed, resolve, reject) {
    if(typeof seed != 'number') throw "seed must be a number, '" + (typeof seed) + "' given";
    if(typeof resolve != 'function') throw "resolve callback must be a function, '" + (typeof resolve) + "' given";
    if(typeof reject != 'function') throw "reject callback must be a function, '" + (typeof reject) + "' given";
    var self = this;
    self._aiWorker = self._createWorker(this._aiDefinition);
    self._aiWorker.onerror = function(err) {
      console.log(err);
      if(self._aiProcessingRejectCallback) {
        self._aiProcessingRejectCallback({
          message: "Web Worker of '" + self._tank.fullName + "' returned an error: " + (err.message ? err.message : 'unknown'),
          performanceIssues: false,
          tankName: self._tank.name,
          tankId: self._tank.id
        });
        self._aiProcessingResolveCallback = null;
        self._aiProcessingRejectCallback = null;
      }
    };

    if(self._aiProcessingCheckInterval) {
      clearInterval(self._aiProcessingCheckInterval);
      self._aiProcessingCheckInterval = null;
    }

    self._aiProcessingCheckInterval = setInterval(function() {
      if(self._aiProcessingRejectCallback) {
        var now = (new Date()).getTime();
        var dt = now - self._aiProcessingStart;
        if(dt > self._aiProcessingTimeLimit) {
          clearInterval(self._aiProcessingCheckInterval);
          self._aiProcessingCheckInterval = null;
          self._aiProcessingRejectCallback({
            message: "Simulation cannot be continued because " + self._tank.name + " #" + self._tank.id + " does not respond",
            performanceIssues: true,
            tankName: self._tank.name,
            tankId: self._tank.id
          });
        }
      }
    }, Math.max(self._aiDefinition.executionLimit, Math.round(self._aiProcessingTimeLimit/2)));

    self._aiWorker.onmessage = function (commandEvent) {
      var value = commandEvent.data;
      if(self._aiProcessingResolveCallback) {
        if(value.type == 'init') {
          self._configureTank(value.settings ? value.settings : {});
          self._isReady = true;
          for(var i=0; i < self._onActivationCallback.length; i++) self._onActivationCallback[i].bind(self)();
        } else {
          self._controlTank(value);
        }

        var callback;
        var now = (new Date()).getTime();
        var dt = now - self._aiProcessingStart;
        if(dt > self._aiDefinition.executionLimit && value.type != 'init') {
          self._slowAiChances--;
          console.warn("Execution of AI for tank " + self._tank.name + " #" + self._tank.id + " takes too long (" + dt + "ms). If problem repeats, AI will be terminated.");
          if(self._slowAiChances <= 0) {
            callback = self._aiProcessingRejectCallback;
            self._aiProcessingResolveCallback = null;
            self._aiProcessingRejectCallback = null;
            callback({
              message: "Simulation cannot be continued because " + self._tank.name + " #" + self._tank.id + " has performance issues",
              performanceIssues: true,
              tankName: self._tank.name,
              tankId: self._tank.id
            });
            return;
          }
        }
        callback = self._aiProcessingResolveCallback;
        self._aiProcessingResolveCallback = null;
        self._aiProcessingRejectCallback = null;
        callback();
      }

    };
    self._aiProcessingStart = (new Date()).getTime();
    self._aiProcessingResolveCallback = resolve;
    self._aiProcessingRejectCallback = reject;
    self._aiWorker.postMessage({
      command: 'init',
      seed: seed + ":" + self._tank.id,
      settings: {
        SKIN: 'zebra'
      },
      code: self._aiDefinition.code,
      initData: self._aiDefinition.initData
    });
  }

  deactivate() {
    if(this._aiWorker) {
      this._aiWorker.terminate();
      this._aiWorker = null;
    }

    if(this._aiProcessingCheckInterval) {
      clearInterval(this._aiProcessingCheckInterval);
      this._aiProcessingCheckInterval = null;
    }
    for(var i=0; i < this._onDectivationCallback.length; i++) this._onDectivationCallback[i].bind(this)();
  }

  simulationStep(resolve, reject) {
    if(typeof resolve != 'function') throw "resolve callback must be a function, '" + (typeof resolve) + "' given";
    if(typeof reject != 'function') throw "reject callback must be a function, '" + (typeof reject) + "' given";
    if(!this._isReady) {
      throw "AI of " + this._tank.fullName + " not initliazed";
    }
    var self = this;
    if(self._aiWorker && self._tank.energy == 0) {
      self._aiWorker.terminate();
      self._aiWorker = null;
      resolve();
      return;
    }

    self._aiProcessingStart = (new Date()).getTime();
    self._aiProcessingResolveCallback = resolve;
    self._aiProcessingRejectCallback = reject;
    self._aiWorker.postMessage({
      command: 'update',
      state: self._tank.state,
      control: self._controlData
    });

  }

  _configureTank(input) {
    var settings = {};

    var skinList = ['zebra', 'forest', 'black', 'tiger', 'desert', 'lava', 'ocean'];
    if(skinList.indexOf(input.SKIN) != -1) {
      settings.SKIN = input.SKIN;
    }
    this._tank.init(settings);
  }

  _controlTank(value) {
    var self = this;
    self._controlData.THROTTLE = Number(value.THROTTLE);
    self._controlData.TURN = Number(value.TURN);
    self._controlData.GUN_TURN = Number(value.GUN_TURN);
    self._controlData.RADAR_TURN = Number(value.RADAR_TURN);
    self._controlData.SHOOT = Number(value.SHOOT);
    self._controlData.DEBUG = value.DEBUG;
    self._controlData.BOOST = value.BOOST ? 1 : 0;

    self._controlData.THROTTLE = isNaN(self._controlData.THROTTLE) ? 0 : self._controlData.THROTTLE;
    self._controlData.TURN = isNaN(self._controlData.TURN) ? 0 : self._controlData.TURN;
    self._controlData.GUN_TURN = isNaN(self._controlData.GUN_TURN) ? 0 : self._controlData.GUN_TURN;
    self._controlData.RADAR_TURN = isNaN(self._controlData.RADAR_TURN) ? 0 : self._controlData.RADAR_TURN;
    self._controlData.SHOOT = isNaN(self._controlData.SHOOT) ? 0 : self._controlData.SHOOT;

    self._controlData.THROTTLE = Math.min(1, Math.max(-1, Number(self._controlData.THROTTLE)));
    self._controlData.TURN = Math.min(1, Math.max(-1, Number(self._controlData.TURN)));
    self._controlData.GUN_TURN = Math.min(1, Math.max(-1, Number(self._controlData.GUN_TURN)));
    self._controlData.RADAR_TURN = Math.min(1, Math.max(-1, Number(self._controlData.RADAR_TURN)));
    self._controlData.SHOOT = Math.min(1, Math.max(0, Number(self._controlData.SHOOT)));

    self._tank.setThrottle(self._controlData.THROTTLE );
    self._tank.setBoost(self._controlData.BOOST );
    self._tank.setTurn(self._controlData.TURN);
    self._tank.setRadarTurn(self._controlData.RADAR_TURN);
    self._tank.setGunTurn(self._controlData.GUN_TURN );
    self._tank.setDebugData(self._controlData.DEBUG);
    if(self._controlData.SHOOT) {
      self._tank.shoot(self._controlData.SHOOT);
    }
    self._controlData.SHOOT = 0;
  }

  _createWorker(def) {
    if(def.useSandbox) {
      return new Worker(def.filePath);
    } else {
      return new EvalWorker();
    }
  }
};
