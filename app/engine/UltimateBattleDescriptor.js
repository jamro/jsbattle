'use strict';

class UltimateBattleDescriptor {

  constructor() {
    this._currentVersion = 1;
    this._aiList = [];
    this._rngSeed = (new Date()).getTime();
  }

  addAiDefinition(ai) {
    this._aiList.push(ai);
  }

  setRngSeed(seed) {
    this._rngSeed = seed;
  }

  createSimulation(renderer) {
    //let simulation = ...
    //for(let ai of this._aiList) {
    //  simualtion.addTank(ai);
    //}
  }

  encode(data) {

  }

  decode() {

  }


}
