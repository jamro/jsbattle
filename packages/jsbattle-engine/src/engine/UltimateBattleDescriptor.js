'use strict';

import AiDefinition from "./AiDefinition.js";
import Ajv from 'ajv';
import schema from '../schema/ubd-schema-v3.json';

class UltimateBattleDescriptor {

  constructor() {
    this._version = 3;
    this._aiList = [];
    this._rngSeed = (new Date()).getTime();
    this._teamMode = false;
    this._timeLimit = 0;
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

  setTimeLimit(limit) {
    this._timeLimit = limit;
  }

  getTimeLimit() {
    return this._timeLimit;
  }

  getRngSeed() {
    return this._rngSeed;
  }

  encode() {
    let json = {
      version: this._version,
      rngSeed: this._rngSeed,
      teamMode: this._teamMode,
      timeLimit: this._timeLimit,
      aiList: []
    };
    for(let ai of this._aiList) {
      json.aiList.push(ai.toJSON());
    }
    let raw = JSON.stringify(json);
    return raw;
  }

  decode(data, unsecureMode) {
    let json;
    try {
      json = JSON.parse(data);
    } catch(err) {
        throw new Error(`Cannot parse UBD file! ${err}`);
    }
    if(this._version !=json.version) {
      throw new Error(`Version of UBD does not match. Version ${json.version} is not supported. Please convert to version ${this._version}`);
    }
    this.validateJsonData(json);
    this._rngSeed = json.rngSeed;
    this._teamMode = json.teamMode;
    this._timeLimit = json.timeLimit;

    let ai;
    for(let aiJson of json.aiList) {
      ai = new AiDefinition();
      if(!unsecureMode) {
        aiJson.useSandbox = true;
        aiJson.executionLimit = 100;
        aiJson.initData = null;
      }
      ai.fromJSON(aiJson);
      this._aiList.push(ai);
    }
  }

  validateJsonData(json) {
    var ajv = new Ajv();
    var validate = ajv.compile(schema);
    var valid = validate(json);
    if (!valid) {
      throw new Error("UBD validation failed - " + validate.errors[0].message);
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
      result.addAiDefinition(aiClone);
    }
    return result;
  }

}

export default UltimateBattleDescriptor;
