'use strict';

import AiDefinition from "./AiDefinition.js";

class UltimateBattleDescriptor {

  constructor() {
    this._version = 2;
    this._aiList = [];
    this._rngSeed = (new Date()).getTime();
    this._teamMode = false;
  }

  addAiDefinition(ai) {
    this._aiList.push(ai);
  }

  setTeamMode(v) {
    this._teamMode = v;
  }

  getTeamMode() {
    return this._teamMode;
  }

  setRngSeed(seed) {
    this._rngSeed = seed;
  }

  getVersion() {
    return this._version;
  }

  getAiList() {
    return this._aiList;
  }

  getRngSeed() {
    return this._rngSeed;
  }

  encode() {
    let json = {
      version: this._version,
      rngSeed: this._rngSeed,
      teamMode: this._teamMode,
      aiList: []
    };
    for(let ai of this._aiList) {
      json.aiList.push(ai.toJSON());
    }
    let raw = JSON.stringify(json);
    return raw;
  }

  decode(data) {
    let json;
    try {
      json = JSON.parse(data);
    } catch(err) {
        throw new Error(`Cannot parse UBD file! ${err}`);
    }
    if(this._version !=json.version) {
      throw new Error(`Version of UBD does not match. Version ${json.version} is not supported. Please convert to version ${this._version}`);
    }
    this._rngSeed = json.rngSeed;
    this._teamMode = json.teamMode;

    let ai;
    for(let aiJson of json.aiList) {
      ai = new AiDefinition();
      ai.fromJSON(aiJson);
      this._aiList.push(ai);
    }
  }

  clone() {
    let result = new UltimateBattleDescriptor();
    result.setRngSeed(this.getRngSeed());
    result.setTeamMode(this.getTeamMode());
    let aiList = this.getAiList();
    let aiClone;
    for(let ai of aiList) {
      aiClone = ai.clone();
      result.addAiDefinition(ai);
    }
    return result;
  }

}

export default UltimateBattleDescriptor;
